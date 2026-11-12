package app_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"stroberi-writes-v2-backend/internal/app"
)

func TestRoutes(t *testing.T) {
	router, err := app.NewRouter()
	if err != nil {
		t.Fatal(err)
	}
	for _, tc := range []struct {
		name, method, path, body string
		status                   int
	}{
		{"health", http.MethodGet, "/api/v1/health", `{"status":"ok"}`, http.StatusOK},
		{"unknown route", http.MethodGet, "/missing", `{"error":"route not found"}`, http.StatusNotFound},
		{"unsupported method", http.MethodPost, "/api/v1/health", `{"error":"method not allowed"}`, http.StatusMethodNotAllowed},
	} {
		t.Run(tc.name, func(t *testing.T) {
			response := httptest.NewRecorder()
			router.ServeHTTP(response, httptest.NewRequest(tc.method, tc.path, nil))
			if response.Code != tc.status || response.Body.String() != tc.body {
				t.Fatalf("got %d %s; want %d %s", response.Code, response.Body.String(), tc.status, tc.body)
			}
			if got := response.Header().Get("Content-Type"); got != "application/json; charset=utf-8" {
				t.Errorf("unexpected content type: %s", got)
			}
		})
	}
}
