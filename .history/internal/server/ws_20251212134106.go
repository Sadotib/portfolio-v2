package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// CheckOrigin: func(r *http.Request) bool {
	// 	return true // allow all websocket connections
	// },
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		log.Println("WS Origin:", origin)
		allowedOrigins := map[string]bool{
			"http://localhost:5173": true,
			"http://127.0.0.1:5173": true,
		}

		return allowedOrigins[origin]
	},
}

func (s *Server) WebSocketHandler(c *gin.Context) {

	// Placeholder for WebSocket handler logic
	action := c.Param("action")
	gameId := c.Param("gameId")
	playerId := c.Param("playerId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil) //upgrade HTTP connection to WebSocket
	if err != nil {
		log.Println(err)
		return
	}

	var room *GameRoom
	var roomExists bool

	switch action { // create or join game room
	case "create":
		room = CreateRoom(gameId)
		log.Println("Room created with ID:", room.ID)
		// conn.WriteMessage(websocket.TextMessage, []byte("Room created"))

	case "join":
		room, roomExists = JoinRoom(gameId)
		if room == nil || !roomExists {
			log.Println("Room with ID", gameId, "does not exist")
			conn.WriteMessage(websocket.TextMessage, []byte("Room does not exist"))
			conn.Close()
			return
		}
		log.Println("Joined room with ID:", room.ID)
	}

	// Add player to room
	room.Players[playerId] = &Player{
		ID:   playerId,
		Conn: conn,
	}

	noOfPlayers := len(room.Players)
	fmt.Printf("Number of plyers in room %s: %d\n", room.ID, noOfPlayers)
	fmt.Printf("%d", noOfPlayers)

	broadcastRoomStatus(room) // Notify all players about the updated room status

	log.Println("Player", playerId, "joined room", gameId)

	// Start listening to messages from this player
	go handlePlayerMessages(room, playerId, conn)

}
