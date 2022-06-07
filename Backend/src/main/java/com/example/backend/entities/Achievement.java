package com.example.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "achievement")
@Getter
@Setter
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Column(columnDefinition = "character varying")
    private String picture;

    private Integer points;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "project_achievement",
            joinColumns = {@JoinColumn(name = "achievement_id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id")}
    )
    private Set<Project> projects;

}
