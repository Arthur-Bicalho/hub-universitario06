package br.edu.hub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistrationRequest(
        @NotBlank @Size(min = 3, max = 100) String studentName,
        @NotBlank @Email @Size(max = 160) String studentEmail
) {
}
