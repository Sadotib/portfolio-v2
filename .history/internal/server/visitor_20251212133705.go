package server

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Visitor struct {
	Conn *websocket.Conn
	IP   string
	Geo  *GeoInfo
}

type GeoInfo struct {
	Country string `json:"country"`
	City    string `json:"city"`
	Query   string `json:"query"`
}

type WebSocketHub struct {
	Clients map[*Visitor]bool
	Mutex   sync.Mutex
}

var Hub = &WebSocketHub{
	Clients: make(map[*Visitor]bool),
}
