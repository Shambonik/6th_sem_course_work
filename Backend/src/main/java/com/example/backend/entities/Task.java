package com.example.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer storyPoints;

    @ManyToOne
    private User creator;

    @ManyToOne
    private User executor;

    @OneToMany
    private Set<Attachment> attachments;

    @OneToMany
    private Set<Comment> comments;

    @ManyToOne
    private TaskStatus status;

    @ManyToOne
    private Board board;

}
