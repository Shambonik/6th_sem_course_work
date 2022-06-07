package com.example.backend.service;

import com.example.backend.dto.request.AssignAndDepriveAchievementRequest;
import com.example.backend.entities.Achievement;
import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import com.example.backend.entities.UserProgress;
import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.UserProgressRepo;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Сервис, выполняющий логику, связанную с выдачей пользователю достижений, повышением уровня
 *
 * @author Danil Kuzin
 */
@Service
public class UserProgressService {

    private final ProjectService projectService;

    private final UserService userService;

    private final AchievementService achievementService;

    public UserProgressService(ProjectService projectService, @Lazy UserService userService, AchievementService achievementService, UserProgressRepo userProgressRepo) {
        this.projectService = projectService;
        this.userService = userService;
        this.achievementService = achievementService;
        this.userProgressRepo = userProgressRepo;
    }

    private final UserProgressRepo userProgressRepo;

    @SneakyThrows
    public Long getPointsToLevelUp(UserProgress userProgress) {
        if (userProgress == null || userProgress.getProject() == null) {
            throw new NotFoundException();
        }
        return userProgress.getProject().getPointsToLevelUp() * Math.round(Math.pow(2, (userProgress.getLevel() - 1)));
    }

    @SneakyThrows
    public Long getLevelDownPoints(UserProgress userProgress) {
        if (userProgress == null || userProgress.getProject() == null) {
            throw new NotFoundException();
        }
        return userProgress.getProject().getPointsToLevelUp() * Math.round(Math.pow(2, (userProgress.getLevel() - 2)));
    }

    @SneakyThrows
    public Project getProjectByAdminAndUser(OidcUser oidcAdmin, User user) {
        User admin = userService.findUserByOidcUser(oidcAdmin).orElseThrow(NotFoundException::new);
        Project project = admin.getProjectsWithAdminRole().stream().findFirst().orElseThrow(NotFoundException::new);
        if (project.getUsers().stream().anyMatch(projectUser -> projectUser.getId().equals(user.getId()))) {
            return project;
        }
        throw new NotFoundException();
    }

    @SneakyThrows
    public void assignAchievement(OidcUser admin, Long achievementId, AssignAndDepriveAchievementRequest request) {
        User user = userService.findUserByEmail(request.getEmail()).orElseThrow(NotFoundException::new);
        Project project = getProjectByAdminAndUser(admin, user);
        if (project.getAchievements().stream().noneMatch(achievementFromSet -> achievementFromSet.getId().equals(achievementId))) {
            throw new BadRequestException();
        }
        Achievement achievement = achievementService.getAchievement(achievementId).orElseThrow(NotFoundException::new);
        UserProgress userProgress = userProgressRepo.findFirstByUser(user).orElseGet(() -> createUserProgress(project, user));
        Set<Achievement> achievementSet = userProgress.getAchievements();
        if (achievementSet.stream().noneMatch(achievementFromSet -> achievementFromSet.getId().equals(achievementId))) {
            achievementSet.add(achievement);
            userProgress.setAchievements(achievementSet);
            long pointsSum = userProgress.getPoints() + achievement.getPoints();
            long pointToLevelUp = getPointsToLevelUp(userProgress);
            while (pointsSum >= pointToLevelUp) {
                userProgress.setLevel(userProgress.getLevel() + 1);
                pointsSum -= pointToLevelUp;
                pointToLevelUp = getPointsToLevelUp(userProgress);
            }
            userProgress.setPoints(pointsSum);
            userProgressRepo.save(userProgress);
        }
    }

    @SneakyThrows
    public void depriveAchievement(OidcUser admin, Long achievementId, AssignAndDepriveAchievementRequest request) {
        User user = userService.findUserByEmail(request.getEmail()).orElseThrow(NotFoundException::new);
        Project project = getProjectByAdminAndUser(admin, user);
        UserProgress userProgress = userProgressRepo.findFirstByUser(user).orElseGet(() -> createUserProgress(project, user));
        Set<Achievement> achievementSet = userProgress.getAchievements();
        Achievement achievement = achievementSet.stream()
                .filter((achievementFromSet) -> achievementFromSet.getId().equals(achievementId))
                .findAny()
                .orElseThrow(BadRequestException::new);
        achievementSet.remove(achievement);
        userProgress.setAchievements(achievementSet);
        long pointsSum = userProgress.getPoints() - achievement.getPoints();
        while (pointsSum < 0) {
            pointsSum += getLevelDownPoints(userProgress);
            userProgress.setLevel(userProgress.getLevel() - 1);
        }
        userProgress.setPoints(pointsSum);
        userProgressRepo.save(userProgress);
    }

    public UserProgress createUserProgress(Project project, User user) {
        UserProgress userProgress = new UserProgress();
        userProgress.setUser(user);
        userProgress.setProject(project);
        userProgress.setLevel(1L);
        userProgress.setPoints(0L);
        userProgress.setAchievements(new HashSet<>());
        return userProgressRepo.save(userProgress);
    }

}
