package br.edu.hub.dto;

import br.edu.hub.entity.ActivityCategory;
import br.edu.hub.entity.ActivityStatus;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ActivityUpdateRequest(
        @Size(min = 3, max = 120) String title,
        @Size(min = 10, max = 2000) String description,
        ActivityCategory category,
        ActivityStatus status,
        @Positive Integer capacity,
        @Size(min = 2, max = 120) String organizer,
        @Size(min = 2, max = 160) String location,
        LocalDateTime date
) {
}
