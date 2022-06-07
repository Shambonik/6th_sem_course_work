package com.example.backend.repo;

import com.example.backend.entities.User;
import com.example.backend.entities.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProgressRepo extends JpaRepository<UserProgress, String> {
    Optional<UserProgress> findFirstByUser(User user);
}
