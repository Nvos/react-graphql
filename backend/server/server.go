package main

import (
	"github.com/gorilla/websocket"
	backend "github.com/nvos/react-graphql"
	"github.com/rs/cors"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/handler"
)

const defaultPort = "8080"

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	http.Handle("/", handler.Playground("Todo", "/query"))
	http.Handle("/query", c.Handler(handler.GraphQL(backend.NewExecutableSchema(backend.New()),
		handler.WebsocketUpgrader(websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}))),
	)
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", nil))
}
