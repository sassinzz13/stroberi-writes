# Current HTTP contract

Source verified: 2026-11-12. Owners: [HTTP code index](../code-index/backend/http.md).

| Request | Status | JSON body |
|---|---|---|
| GET `/api/v1/health` | 200 | `{"status":"ok"}` |
| Unknown backend path, tested as GET `/missing` | 404 | `{"error":"route not found"}` |
| Unsupported method, tested as POST `/api/v1/health` | 405 | `{"error":"method not allowed"}` |

Responses above use `application/json; charset=utf-8`, asserted by `TestRoutes`. Health is liveness: it reports that this handler can respond, not that a database or external dependency is ready. There is no persistence or authentication. Gin logger and recovery middleware run before handlers; shared error responses belong to app.NewRouter.

The frontend `/` route renders a welcome heading and paragraph and does not call this API. Future integrations must define their API contract and connection path before implementation; neither browser CORS nor a Next API rewrite is currently configured.
