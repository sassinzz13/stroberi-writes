// Package health exposes the API's liveness endpoint.
package health

import "github.com/gin-gonic/gin"

func RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/health", getHealth)
}
