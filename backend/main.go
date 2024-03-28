package main

import (
	"jolly/jolly"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	server := echo.New()
	server.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${method} ${uri} => ${status}\n",
	}))

	handler := jolly.NewHandler()
	go handler.Run()

	server.GET("/", handler.RouteGet)
	server.GET("/ws", handler.RouteWS)

	err := server.Start(":8000")
	server.Logger.Fatal(err)
}
