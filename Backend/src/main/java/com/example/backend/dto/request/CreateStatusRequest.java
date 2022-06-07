package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateStatusRequest {

    private String value;

    private Integer order;

}
