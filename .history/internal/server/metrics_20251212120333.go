package server

import "time"

type Metrics struct {
	StartTime       time.Time
	TotalRequests   uint64
	TotalLatencyNs  uint64
	ActiveWSClients int32
}
