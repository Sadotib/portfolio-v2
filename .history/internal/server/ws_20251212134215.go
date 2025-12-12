package server

import (
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

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("ws upgrade error:", err)
		return
	}

	clientIP := c.ClientIP()
	geo := LookupGeoInfo(clientIP) // we'll implement this below

	client := &Client{
		Conn: conn,
		IP:   clientIP,
		Geo:  geo,
	}

	Hub.Mutex.Lock()
	Hub.Clients[client] = true
	Hub.Mutex.Unlock()

	M.IncWS() // update metrics

	Hub.BroadcastVisitorInfo()

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}

	Hub.Mutex.Lock()
	delete(Hub.Clients, client)
	Hub.Mutex.Unlock()

	M.DecWS()
	Hub.BroadcastVisitorInfo()
	conn.Close()

}

func (h *WebSocketHub) BroadcastVisitorInfo() {
	h.Mutex.Lock()
	defer h.Mutex.Unlock()

	type Visitor struct {
		IP  string   `json:"ip"`
		Geo *GeoInfo `json:"geo"`
	}

	var visitors []Visitor

	for c := range h.Clients {
		visitors = append(visitors, Visitor{
			IP:  c.IP,
			Geo: c.Geo,
		})
	}

	for client := range h.Clients {
		client.Conn.WriteJSON(gin.H{
			"active":   len(h.Clients),
			"visitors": visitors,
		})
	}
}
