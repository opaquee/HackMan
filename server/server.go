package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/rs/cors"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		allowHeaders := "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "http://192.168.0.100:8000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", allowHeaders)

		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fs := http.FileServer(http.Dir("./public"))
		fs.ServeHTTP(w, r)
	})

	id := 100
	server, _ := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected: ", id)
		s.Join("default")
		server.BroadcastToRoom("/", "default", "playerJoined", id)
		id++
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
	mux.Handle("/socket.io/", corsMiddleware(server))

	handler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"192.168.0.100", "192.168.0.100:8000"},
		AllowOriginFunc: func(origin string) bool {return true},
		AllowCredentials: true,
	})

	// decorate existing handler with cors functionality set in c
	handler = c.Handler(handler)
	/*
	http.Handle("/socket.io/", server)
	http.Handle("/public", http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	*/
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
