package server

import "golang.org/x/net/websocket"

type Visitor struct {
	Conn *websocket.Conn
	IP   string
	Geo  *GeoInfo
}
