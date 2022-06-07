package com.example.backend.service;

import com.example.backend.dto.enums.UserProjectRole;
import com.example.backend.dto.request.GrantAccessRequest;
import com.example.backend.dto.response.ProjectResponse;
import com.example.backend.dto.response.ProjectShortResponse;
import com.example.backend.entities.Achievement;
import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.ProjectRepo;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Сервис, выполняющий логику, связанную с проектами
 *
 * @author Danil Kuzin
 */
@Service
public class ProjectService {

    private final ProjectRepo projectRepo;

    private final UserService userService;

    private final AchievementService achievementService;

    public ProjectService(ProjectRepo projectRepo, @Lazy UserService userService, AchievementService achievementService) {
        this.projectRepo = projectRepo;
        this.userService = userService;
        this.achievementService = achievementService;
    }

    @SneakyThrows
    public void grandAccess(GrantAccessRequest request) {
        User user = userService.findUserByEmail(request.getEmail()).orElseThrow(NotFoundException::new);
        Project project = getProject(request.getProjectId()).orElseThrow(NotFoundException::new);
        Set<User> projectUsers = project.getUsers();
        projectUsers.add(user);
        project.setUsers(projectUsers);
        if (projectUsers.containsAll(project.getUsers())) {
            return;
        }
        projectRepo.save(project);
    }

    @SneakyThrows
    public ProjectShortResponse buildProjectShortResponse(Project project) {
        if (project == null) {
            throw new NotFoundException();
        }
        return new ProjectShortResponse()
                .setId(project.getId())
                .setName(project.getName());
    }

    @SneakyThrows
    public ProjectResponse buildProjectResponse(Long id) {
        Project project = getProject(id).orElseThrow(NotFoundException::new);
        return new ProjectResponse()
                .setId(project.getId())
                .setName(project.getName())
                .setDescription(project.getDescription())
                .setAchievements(project.getAchievements().stream()
                        .map(achievementService::buildAchievementResponse)
                        .collect(Collectors.toList())
                );
    }

    @SneakyThrows
    public UserProjectRole getUserProjectRole(User user, Project project) {
        if (user == null || project == null) {
            throw new NotFoundException();
        }
        if (project.getAdmins().contains(user)) {
            return UserProjectRole.PROJECT_ADMIN;
        }
        return UserProjectRole.PROJECT_USER;
    }

    public Optional<Project> getProjectByAdmin(User user) {
        return projectRepo.findFirstByAdminsContains(user);
    }


    public Optional<Project> getProject(Long id) {
        return projectRepo.findById(id);
    }

}
