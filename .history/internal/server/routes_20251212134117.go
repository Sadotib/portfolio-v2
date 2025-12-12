package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()

	r.Use(
		cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:5173"}, // Add your frontend URL
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
			AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
			AllowCredentials: true, // Enable cookies/auth
		}),
		MetricsMiddleware(),
	)

	r.GET("/", s.HelloWorldHandler)
	r.GET("/metrics", s.MetricsHandler)
	r.GET("/ws/visitors", s.WebSocketHandler)

	return r
}
