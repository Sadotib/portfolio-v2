package server

import (
	"sync/atomic"
	"time"
)

type Metrics struct {
	StartTime       time.Time
	TotalRequests   uint64
	TotalLatencyNs  uint64
	ActiveWSClients int32
}

var M = &Metrics{
	StartTime: time.Now(),
}

// called from middleware
func (m *Metrics) RecordRequest(latency time.Duration) {
	atomic.AddUint64(&m.TotalRequests, 1)
	atomic.AddUint64(&m.TotalLatencyNs, uint64(latency))
}

// Called from WebSocket connect/disconnect
func (m *Metrics) IncWS() {
	atomic.AddInt32(&m.ActiveWSClients, 1)
}

func (m *Metrics) DecWS() {
	atomic.AddInt32(&m.ActiveWSClients, -1)
}
