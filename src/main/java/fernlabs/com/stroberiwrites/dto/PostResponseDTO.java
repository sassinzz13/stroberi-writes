package fernlabs.com.stroberiwrites.dto;

/*
MENTAL MODEL — response DTO
===========================
This is the shape of the JSON we send BACK to the client. It DOES include id
(unlike PostRequestDTO) because the client legitimately wants to know what id
the new post got.

Why keep request and response DTOs separate even though they look similar?
  - Different fields belong on each side. Request has no id. Response has id.
    Future: response might add createdAt, author info — request shouldn't accept those.
  - It's the kind of thing that costs nothing now and prevents bugs later.

Why not just return the Post entity directly?
  - Coupling: any field you add to the entity (e.g. an internal `isDraft` flag,
    or a reference to another entity) leaks into the public API automatically.
  - Lazy-loading: JPA entities can have lazy-loaded relations that blow up
    during JSON serialization if the DB session is closed.
DTOs are a firewall between "what we store" and "what we expose".

When Spring serializes this record to JSON, it uses the component names as the
JSON keys:  { "id": 1, "title": "...", "slug": "...", "content": "..." }
*/
public record PostResponseDTO(
        Long id,
        String title,
        String slug,
        String content
) {
}