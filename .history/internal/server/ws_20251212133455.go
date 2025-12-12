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
	Clients map[*Client]bool
	Mutex   sync.Mutex
}
