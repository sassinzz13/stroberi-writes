// Package app wires feature routes and shared HTTP infrastructure.
package app

import (
	"net"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"stroberi-writes-v2-backend/internal/config"
	"stroberi-writes-v2-backend/internal/features/health"
)

func NewServer(cfg config.Config) (*http.Server, error) {
	gin.SetMode(cfg.GinMode)
	router, err := NewRouter()
	if err != nil {
		return nil, err
	}
	return &http.Server{
		Addr:              net.JoinHostPort("", cfg.Port),
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}, nil
}

func NewRouter() (*gin.Engine, error) {
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())
	// Enable specific trusted proxy addresses here when deploying behind a proxy.
	if err := router.SetTrustedProxies(nil); err != nil {
		return nil, err
	}
	router.HandleMethodNotAllowed = true
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"error": "route not found"})
	})
	router.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "method not allowed"})
	})

	health.RegisterRoutes(router.Group("/api/v1"))
	return router, nil
}
