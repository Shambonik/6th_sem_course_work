package com.example.backend.repo;

import com.example.backend.entities.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepo extends JpaRepository<Achievement, Long> {
}
