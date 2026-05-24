package fernlabs.com.stroberiwrites.dto;

import java.time.LocalDateTime;

public record CategoryResponseDTO(
        Long id,
        String name,
        String slug,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
