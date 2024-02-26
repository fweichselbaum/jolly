package jolly

import (
	"encoding/json"
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = 55 * time.Second
	maxMessageSize = 65536
)

func (client *Client) ReadLoop() {
	defer func() {
		client.Handler.Unregister <- client
		client.Conn.Close()
	}()

	client.Conn.SetReadLimit(maxMessageSize)
	client.Conn.SetReadDeadline(time.Now().Add(pongWait))
	client.Conn.SetPongHandler(func(string) error {
		client.Conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})
	for {
		_, bytes, err := client.Conn.ReadMessage()
		if err != nil {
			break
		}

		var msg Message
		err = json.Unmarshal(bytes, &msg)
		if err != nil {
			break
		}

		switch msg.MsgType {
		case "state": // TODO
		case "control":
			data := msg.Data.(string)
			if data == "start" {
				client.Handler.State.Start()
			}
		}

		client.Handler.Broadcast <- &Message{
			MsgType: "state",
			Data:    client.Handler.State,
		}
	}
}

func (client *Client) WriteLoop() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		client.Conn.Close()
	}()

	for {
		select {
		case msg, ok := <-client.Send:
			if !ok { // channel closed
				client.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			} else {
				client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
				json, err := json.Marshal(msg)
				if err != nil {
					break
				}
				err = client.Conn.WriteMessage(websocket.TextMessage, json)
				if err != nil {
					break
				}
			}
		case <-ticker.C:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
