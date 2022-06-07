package com.example.backend.dto.response;

import com.example.backend.dto.enums.UserProjectRole;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class GetUserResponse {

    private String id;

    private String picture;

    private String name;

    private String email;

    private Long level;

    private UserProjectRole role;

    private Long pointsToLevelUp;

    private Long points;

    private ProjectShortResponse project;

}
