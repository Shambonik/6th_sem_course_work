package com.example.backend.repo;

import com.example.backend.entities.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskStatusRepo extends JpaRepository<TaskStatus, Long> {
}
