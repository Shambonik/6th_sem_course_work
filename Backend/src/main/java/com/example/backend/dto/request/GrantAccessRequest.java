package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GrantAccessRequest {

    private String email;

    private Long projectId;

}
