package jolly

import (
	"jolly/pb"

	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
)

type Map map[string]any

func Err(err string) Map {
	return Map{
		"error": err,
	}
}

type Handler struct {
	State      *State
	Clients    map[string]*Client
	Register   chan *Client
	Unregister chan *Client
	HandleMsg  chan *Message
}

type Client struct {
	Name    string
	Conn    *websocket.Conn
	Handler *Handler
	Send    chan []byte
}

func NewHandler() *Handler {
	return &Handler{
		State:      NewState(),
		Clients:    make(map[string]*Client),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		HandleMsg:  make(chan *Message),
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
		select {
		case client := <-handler.Register:
			handler.RegisterClient(client)

		case client := <-handler.Unregister:
			handler.UnregisterClient(client)

		case msg := <-handler.HandleMsg:
			// TODO
			_ = msg
		}
	}
}

func (handler *Handler) RegisterClient(client *Client) {
	handler.Clients[client.Name] = client
	if !handler.State.OnGoing {
		handler.State.Player[client.Name] = NewPlayer(client.Name, handler)
	}

	handler.Broadcast()
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

	handler.Broadcast()
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
			DrawSet:     draw,
			FoldSet:     handler.State.FoldDeck,
			HandSet:     handler.State.Player[client.Name].Hand,
			PlayerInfos: playerInfo,
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
