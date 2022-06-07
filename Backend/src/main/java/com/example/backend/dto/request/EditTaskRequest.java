package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EditTaskRequest {

    private String name;

    private String description;

    private Integer storyPoints;

    private String executorEmail;

    private Long statusId;

}
