package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends ServerException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException() {
        super("Bad Request (400)");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
