package com.example.backend.repo;

import com.example.backend.entities.Board;
import com.example.backend.entities.BoardTaskStatus;
import com.example.backend.entities.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardTaskStatusRepo extends JpaRepository<BoardTaskStatus, Long> {
    List<BoardTaskStatus> findAllByBoardOrderByOrder(Board board);

    Optional<BoardTaskStatus> findByBoardAndTaskStatus(Board board, TaskStatus taskStatus);
}
