package br.edu.hub.dto;

import br.edu.hub.entity.Activity;
import br.edu.hub.entity.ActivityCategory;
import br.edu.hub.entity.ActivityStatus;

import java.time.LocalDateTime;

public record ActivityResponse(
        Long id,
        String title,
        String description,
        ActivityCategory category,
        ActivityStatus status,
        int capacity,
        int registeredCount,
        int remainingSpots,
        String organizer,
        String location,
        LocalDateTime date,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ActivityResponse from(Activity activity) {
        return new ActivityResponse(
                activity.getId(), activity.getTitle(), activity.getDescription(), activity.getCategory(),
                activity.getStatus(), activity.getCapacity(), activity.getRegisteredCount(),
                activity.remainingSpots(), activity.getOrganizer(), activity.getLocation(), activity.getDate(),
                activity.getCreatedAt(), activity.getUpdatedAt()
        );
    }
}
