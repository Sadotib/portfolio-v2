package server

import "github.com/gorilla/websocket"

type Visitor struct {
	Conn *websocket.Conn
	IP   string
	Geo  *GeoInfo
}
