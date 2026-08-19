package br.edu.hub.dto;

import br.edu.hub.entity.Registration;

import java.time.LocalDateTime;

public record RegistrationResponse(
        Long id,
        Long activityId,
        String studentName,
        String studentEmail,
        LocalDateTime createdAt
) {
    public static RegistrationResponse from(Registration registration) {
        return new RegistrationResponse(registration.getId(), registration.getActivity().getId(),
                registration.getStudentName(), registration.getStudentEmail(), registration.getCreatedAt());
    }
}
