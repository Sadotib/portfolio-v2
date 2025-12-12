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

type WebSocketHub struct {
	Clients map[*Visitor]bool
	Mutex   sync.Mutex
}

var Hub = &WebSocketHub{
	Clients: make(map[*Visitor]bool),
}
