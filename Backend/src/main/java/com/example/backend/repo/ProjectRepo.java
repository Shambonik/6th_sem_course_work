package com.example.backend.repo;

import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    Optional<Project> findFirstByAdminsContains(User admin);

    Optional<Project> findFirstByUsersContains(User user);
}
