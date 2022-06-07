package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateAchievementRequest {

    private String name;

    private String description;

    private Integer points;

    private String picture;

}
