type Visitor struct {
	Conn *websocket.Conn
	IP   string
	Geo  *GeoInfo
}