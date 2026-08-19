package br.edu.hub.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(String message, LocalDateTime timestamp, Map<String, String> errors) {
    public static ErrorResponse of(String message) {
        return new ErrorResponse(message, LocalDateTime.now(), Map.of());
    }
}
