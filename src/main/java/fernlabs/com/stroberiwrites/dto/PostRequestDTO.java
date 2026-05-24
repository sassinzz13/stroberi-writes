package fernlabs.com.stroberiwrites.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/*
MENTAL MODEL — request DTO
==========================
DTO = Data Transfer Object. This is the shape of the JSON the client SENDS to us
on create/update. It's separate from the Post entity for one big reason:
  - The Post entity has an `id` field. The CLIENT must not be able to set the id —
    that's the database's job. By using a DTO without an `id` field, we make it
    physically impossible for the client to spoof an id.

WHY `record` INSTEAD OF `class`?
Java records (added in Java 14+) are a one-line way to declare an immutable
data carrier. Writing `public record PostRequestDTO(String title, ...)` gives you:
  - private final fields for each component
  - a constructor taking all the fields
  - accessor methods: title(), slug(), content() (note: NOT getTitle()!)
  - equals(), hashCode(), toString() — all auto-generated based on the fields
Records can't have setters (they're immutable) — perfect for DTOs that should
be set-once, read-many.

VALIDATION ANNOTATIONS — what they do at request time:
  @NotBlank → reject null, empty string, AND whitespace-only strings ("   ")
  @Size(max=255) → reject strings longer than 255 chars
The controller's @Valid annotation is what TRIGGERS these checks. Without @Valid,
these annotations would just sit here doing nothing.

DJANGO ANALOGUE: this is roughly a DRF serializer with required=True, max_length=255.
*/
public record PostRequestDTO(
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must be 255 characters or less")
        String title,

        @NotBlank(message = "Slug is required")
        @Size(max = 255, message = "Slug must be 255 characters or less")
        String slug,

        @NotBlank(message = "Content is required")
        String content,

        @NotNull(message = "Category is required")
        Long categoryId
) {
}
