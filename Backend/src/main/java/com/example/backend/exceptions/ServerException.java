package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class ServerException extends Exception {

    public ServerException() {
        super("Server Error (500)");
    }

    public ServerException(String message) {
        super(message);
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
