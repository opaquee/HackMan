package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	socketio "github.com/googollee/go-socket.io"
)

func ginMiddleware(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Request.Header.Del("Origin")

		c.Next()
	}
}

func main() {
	router := gin.New()

	server, _ := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		fmt.Println("connected:", s.ID())
		return nil
	})

	server.OnEvent("/", "move", func(s socketio.Conn, msg string) {
		fmt.Println("move:", msg)
		s.Emit("heartbeat", "player position data goes here")
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("Error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	router.Use(ginMiddleware("http://localhost:8080"))
	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))
	router.StaticFS("/public", http.Dir("../asset"))

	router.Run()
}
