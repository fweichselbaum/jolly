package jolly

import (
	"fmt"
	"jolly/pb"

	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

type Handler struct {
	State        *State
	Clients      map[string]*Client
	Register     chan *Client
	Unregister   chan *Client
	HandleAction chan *pb.Action
}

type Client struct {
	Name    string
	Conn    *websocket.Conn
	Handler *Handler
	Send    chan []byte
}

func NewHandler() *Handler {
	return &Handler{
		State:        NewState(),
		Clients:      make(map[string]*Client),
		Register:     make(chan *Client),
		Unregister:   make(chan *Client),
		HandleAction: make(chan *pb.Action),
	}
}

func NewClient(name string, handler *Handler, conn *websocket.Conn) *Client {
	return &Client{
		Name:    name,
		Handler: handler,
		Conn:    conn,
		Send:    make(chan []byte, 64),
	}
}

func (handler *Handler) Run() {
	for {
		var err error
		select {
		case client := <-handler.Register:
			handler.RegisterClient(client)

		case client := <-handler.Unregister:
			handler.UnregisterClient(client)

		case action := <-handler.HandleAction:
			err = handler.ProcessAction(action)
		}
		if err != nil {
			// TODO send error message
		} else {
			handler.Broadcast()
		}
	}
}

func (handler *Handler) RegisterClient(client *Client) {
	handler.Clients[client.Name] = client
	if !handler.State.OnGoing {
		handler.State.Player[client.Name] = NewPlayer(client.Name, handler)
	}
}

func (handler *Handler) UnregisterClient(client *Client) {
	_, client_exists := handler.Clients[client.Name]
	if !client_exists {
		return
	}

	delete(handler.Clients, client.Name)
	if !handler.State.OnGoing {
		delete(handler.State.Player, client.Name)
	}
	close(client.Send)
}

func (handler *Handler) Broadcast() {

	draw := handler.State.DrawDeck.Hide()
	playerInfo := make(map[string]*pb.PlayerInfo)

	for _, client := range handler.Clients {

		player := handler.State.Player[client.Name]
		playerInfo[client.Name] = &pb.PlayerInfo{
			HandSet:    player.Hand.Hide(),
			PlayedSets: player.Cards,
		}
	}

	for _, client := range handler.Clients {

		update := pb.Update{
			DrawSet:       draw,
			FoldSet:       handler.State.FoldDeck,
			HandSet:       handler.State.Player[client.Name].Hand,
			PlayerInfos:   playerInfo,
			CurrentPlayer: handler.State.CurrentPlayer,
			OnGoing:       handler.State.OnGoing,
		}

		msg, err := proto.Marshal(&update)
		if err != nil {
			continue
		}

		select {
		case client.Send <- msg:
		default:
			close(client.Send)
			delete(handler.Clients, client.Name)
		}
	}
}

func (handler *Handler) ProcessAction(action *pb.Action) error {
	player, ok := handler.State.Player[action.Player]
	if !ok {
		return fmt.Errorf("unknown player")
	}

	if action.GetStart() == nil && action.Player != handler.State.CurrentPlayer {
		return fmt.Errorf("%s is not the active player", action.Player)
	}

	var err error = nil
	switch action.Action.(type) {
	case *pb.Action_Start:
		err = handler.State.Start()
	case *pb.Action_Draw:
		err = handler.State.Draw(player)
	case *pb.Action_DrawFolded:
		err = handler.State.DrawFolded(player, action.GetDrawFolded())
	case *pb.Action_Fold:
		err = handler.State.Fold(player, action.GetFold())
	case *pb.Action_PlaySet:
		err = handler.State.PlaySet(player, action.GetPlaySet())
	case *pb.Action_PlaySingleCard:
		err = handler.State.PlaySingleCard(player, action.GetPlaySingleCard())
	}
	return err
}
