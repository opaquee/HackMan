package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

type player struct {
	id    int  //`json:"id"`
	ghost bool //`json:"ghost"`
	x     int  //`json:"x"`
	y     int  //`json:"y"`
}

func main() {
	server, _ := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected: ", s.ID())
		s.Emit("newPlayer", s.ID())
		s.Join("default")
		return nil
	})

	server.OnEvent("/", "newBoard", func(s socketio.Conn, newBoard string) {
		fmt.Println("newBoard ", newBoard)
		server.BroadcastToRoom("/", "default", "newBoard", newBoard)
	})

	server.OnEvent("/", "newPlayers", func(s socketio.Conn, newPlayers string) {
		fmt.Println("newPlayers ", newPlayers)
		server.BroadcastToRoom("/", "default", "newPlayers", newPlayers)
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", server)
	http.Handle("/", http.FileServer(http.Dir("./public")))
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
