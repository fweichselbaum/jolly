package jolly

import (
	"errors"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     websocket.IsWebSocketUpgrade,
}

func (handler *Handler) RouteGet(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, handler)
}

func (handler *Handler) RouteWS(ctx echo.Context) error {
	name := ctx.QueryParam("name")

	if !handler.isAllowed(name) {
		return errors.New("not allowed to join")
	}

	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		return err
	}

	client := NewClient(name, handler, ws)
	handler.Register <- client

	go client.WriteLoop()
	go client.ReadLoop()

	return nil
}

func (handler *Handler) isAllowed(name string) bool {

	_, client_exists := handler.Clients[name]
	_, player_exists := handler.State.Player[name]

	if client_exists {
		return false
	}
	if handler.State.OnGoing && !player_exists {
		return false
	}

	return true
}

/*
func (handler *Handler) RouteJoin(ctx echo.Context) error {
	name := ctx.QueryParam("name")
	_, conn_exists := handler.State.Player[name]
	if conn_exists {
		return ctx.JSON(http.StatusBadRequest, Err(fmt.Sprintf("Player '%s' already exists", name)))
	}
	handler.State.Player[name] = NewPlayer(name, handler)
	return ctx.NoContent(http.StatusCreated)
}

func (handler *Handler) RouteLeave(ctx echo.Context) error {
	name := ctx.QueryParam("name")
	_, conn_exists := handler.State.Player[name]
	if !conn_exists {
		return ctx.JSON(http.StatusBadRequest, Err(fmt.Sprintf("Player '%s' doesn't exist", name)))
	}
	delete(handler.State.Player, name)
	return ctx.NoContent(http.StatusAccepted)
}
*/
