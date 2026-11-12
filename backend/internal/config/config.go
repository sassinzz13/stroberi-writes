// Package config loads and validates application configuration.
package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Port    string
	GinMode string
}

func Load() (Config, error) {
	cfg := Config{
		Port:    envOrDefault("PORT", "8080"),
		GinMode: envOrDefault("GIN_MODE", "debug"),
	}
	port, err := strconv.Atoi(cfg.Port)
	if err != nil || port < 1 || port > 65535 {
		return Config{}, fmt.Errorf("PORT must be an integer between 1 and 65535")
	}
	switch cfg.GinMode {
	case "debug", "release", "test":
	default:
		return Config{}, fmt.Errorf("GIN_MODE must be debug, release, or test")
	}
	return cfg, nil
}

func envOrDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
