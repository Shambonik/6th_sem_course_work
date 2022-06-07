package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class TaskShortResponse {

    private Long id;

    private String name;

    private Long statusId;

    private Integer storyPoints;

    private UserShortResponse executor;

}
