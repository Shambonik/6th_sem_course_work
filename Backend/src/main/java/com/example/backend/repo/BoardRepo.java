package com.example.backend.repo;

import com.example.backend.entities.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepo extends JpaRepository<Board, Long> {
    @Query("SELECT board FROM Board board " +
            "WHERE (board.project.id = :projectId)"
    )
    List<Board> findAllByProjectId(Long projectId);
}
