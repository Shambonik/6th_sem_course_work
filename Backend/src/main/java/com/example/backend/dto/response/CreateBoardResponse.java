package com.example.backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class CreateBoardResponse {

    private Long boardId;

    private String name;

    private String description;

}
