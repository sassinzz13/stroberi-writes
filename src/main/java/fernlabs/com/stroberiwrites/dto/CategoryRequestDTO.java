package fernlabs.com.stroberiwrites.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(max = 255, message = "Name must be 255 characters or less")
        String name,

        @NotBlank(message = "Slug is required")
        @Size(max = 255, message = "Slug must be 255 characters or less")
        String slug
) {
}