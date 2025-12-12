package server

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	Conn *websocket.Conn
	IP   string
	Geo  *GeoInfo
}

type GeoInfo struct {
	Country string `json:"country"`
	City    string `json:"city"`
	Query   string `json:"query"`
}

func LookupGeoInfo(ip string) *GeoInfo {
	resp, err := http.Get("http://ip-api.com/json/" + ip)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	var data GeoInfo
	json.NewDecoder(resp.Body).Decode(&data)
	return &data
}

type WebSocketHub struct {
	Clients map[*Client]bool
	Mutex   sync.Mutex
}

var Hub = &WebSocketHub{
	Clients: make(map[*Client]bool),
}
