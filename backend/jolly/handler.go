package jolly

import (
	"github.com/gorilla/websocket"
)

type Map map[string]any

func Err(err string) Map {
	return Map{
		"error": err,
	}
}

type Handler struct {
	State      *State             `json:"state"`
	Clients    map[string]*Client `json:"clients"`
	Register   chan *Client       `json:"-"`
	Unregister chan *Client       `json:"-"`
	Broadcast  chan *Message      `json:"-"`
}

type Client struct {
	Name    string          `json:"name"`
	Conn    *websocket.Conn `json:"conn"`
	Handler *Handler        `json:"-"`
	Send    chan *Message   `json:"-"`
}

func NewHandler() *Handler {
	return &Handler{
		State:      NewState(),
		Clients:    make(map[string]*Client),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message),
	}
}

func NewClient(name string, handler *Handler, conn *websocket.Conn) *Client {
	return &Client{
		Name:    name,
		Handler: handler,
		Conn:    conn,
		Send:    make(chan *Message, 64),
	}
}

func (handler *Handler) Run() {
	for {
		select {
		case client := <-handler.Register:
			handler.RegisterClient(client)

		case client := <-handler.Unregister:
			handler.UnregisterClient(client)

		case msg := <-handler.Broadcast:
			for _, client := range handler.Clients {
				select {
				case client.Send <- msg:
				default:
					close(client.Send)
					delete(handler.Clients, client.Name)
				}
			}
		}
	}
}

func Msg(channel chan *Message, msg *Message) {
	channel <- msg
}

func (handler *Handler) RegisterClient(client *Client) {
	handler.Clients[client.Name] = client
	if !handler.State.OnGoing {
		handler.State.Player[client.Name] = NewPlayer(client.Name, handler)
	}

	go Msg(
		handler.Broadcast,
		&Message{
			MsgType: "state",
			Data:    handler.State,
		})
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

	go Msg(
		handler.Broadcast,
		&Message{
			MsgType: "state",
			Data:    handler.State,
		})
}

// func (handler *Handler) BroadcastMove(move *Move) {

// 	// handler.HandleMove(move)

// 	for _, player := range handler.State.Player {
// 		select {
// 		case player.Send <- move:
// 		default:
// 			close(player.Send)
// 			delete(handler.State.Player, player.Name)
// 		}
// 	}
// }

// 	var card *Card
// 	state := handler.State

// 	// FROM
// 	if move.From.Owner == Game {
// 		switch move.From.NR {
// 		case DrawDeck:
// 			state.DrawDeck, card = RemoveCard(state.DrawDeck, move.Card)
// 		case FoldDeck:
// 			state.FoldDeck, card = RemoveCard(state.FoldDeck, move.Card)
// 		}
// 	} else {
// 		f := move.From
// 		state.Player[f.Owner].Cards[f.NR], card = RemoveCard(
// 			state.Player[f.Owner].Cards[f.NR],
// 			move.Card,
// 		)
// 	}

// 	// TO
// 	if move.To.Owner == Game {
// 		state.FoldDeck = append(state.FoldDeck, card)
// 	} else {
// 		t := move.To
// 		state.Player[t.Owner].Cards[t.NR] = append(
// 			state.Player[t.Owner].Cards[t.NR],
// 			card,
// 		)
// 	}
// }
