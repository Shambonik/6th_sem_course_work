package com.example.backend.entities;

import com.example.backend.entities.enums.BoardStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "board")
@Getter
@Setter
public class  Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private BoardStatus status;

    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER)
    private Set<Task> tasks;

    @ManyToOne
    private Project project;

    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER)
    private Set<BoardTaskStatus> boardTaskStatuses;

}
