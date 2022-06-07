package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends ServerException {

    public ForbiddenException() {
        super("Forbidden (403)");
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.FORBIDDEN;
    }
}
