package com.example.backend.entities.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum BoardStatus {
    OPEN("Открыта"),
    CLOSED("Закрыта"),
    DELETED("Удалена");

    private final String value;
}
