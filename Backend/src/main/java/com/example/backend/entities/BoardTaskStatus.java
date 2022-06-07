package com.example.backend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "board_task_status")
@Getter
@Setter
public class BoardTaskStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_on_board")
    private Integer order;

    @ManyToOne
    private Board board;

    @ManyToOne
    private TaskStatus taskStatus;

}
