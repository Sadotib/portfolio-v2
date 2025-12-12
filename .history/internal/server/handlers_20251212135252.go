package server

import (
	"net/http"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
)

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) MetricsHandler(c *gin.Context) {
	var mem runtime.MemStats
	runtime.ReadMemStats(&mem)

	uptime := time.Since(M.StartTime)

	avgLatency := float64(0)
	if M.TotalRequests > 0 {
		avgLatency = float64(M.TotalLatencyNs) / float64(M.TotalRequests) / 1e6
	}

	c.JSON(http.StatusOK, gin.H{
		"uptime":                 uptime.String(),
		"goroutines":             runtime.NumGoroutine(),
		"memory_alloc":           mem.Alloc,
		"memory_total_alloc":     mem.TotalAlloc,
		"memory_sys":             mem.Sys,
		"gc_cycles":              mem.NumGC,
		"avg_request_latency_ms": avgLatency,
		"active_ws_clients":      M.ActiveWSClients,
	})
}

func (s *Server) JoinHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Join endpoint reached",
	})
}
