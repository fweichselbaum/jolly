package jolly

import (
	"jolly/pb"
	"log"
	"time"

	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
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
		action := &pb.Action{}
		err = proto.Unmarshal(bytes, action)
		if err != nil {
			break
		}
		log.Println("RECIEVE")

		client.Handler.HandleAction <- action
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

				err := client.Conn.WriteMessage(websocket.BinaryMessage, msg)
				if err != nil {
					break
				}
				log.Println("SEND")
			}
		case <-ticker.C:
			client.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := client.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
