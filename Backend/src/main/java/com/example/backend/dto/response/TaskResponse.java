package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class TaskResponse {

    private Long id;

    private String name;

    private String description;

    private Integer storyPoints;

    private String status;

    private Long boardId;

    private UserShortResponse executor;

}
