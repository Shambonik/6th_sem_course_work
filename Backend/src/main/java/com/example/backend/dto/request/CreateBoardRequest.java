package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBoardRequest {

    private Long projectId;

    private String name;

    private String description;

}
