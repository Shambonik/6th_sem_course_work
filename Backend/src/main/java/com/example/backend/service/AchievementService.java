package com.example.backend.service;

import com.example.backend.dto.request.CreateAchievementRequest;
import com.example.backend.dto.response.AchievementResponse;
import com.example.backend.dto.response.GetAchievementPictureResponse;
import com.example.backend.entities.Achievement;
import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.AchievementRepo;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Сервис, выполняющий логику, связанную с достижениями
 *
 * @author Danil Kuzin
 */
@Service
public class AchievementService {

    private final AchievementRepo achievementRepo;

    private final UserService userService;

    private final ProjectService projectService;

    public AchievementService(AchievementRepo achievementRepo, @Lazy UserService userService, @Lazy ProjectService projectService) {
        this.achievementRepo = achievementRepo;
        this.userService = userService;
        this.projectService = projectService;
    }

    @SneakyThrows
    public Project getProjectByAchievementId(Long id) {
        Achievement achievement = getAchievement(id).orElseThrow(NotFoundException::new);
        return achievement.getProjects().stream().findFirst().orElseThrow(NotFoundException::new);
    }

    @SneakyThrows
    public AchievementResponse buildAchievementResponse(Achievement achievement) {
        return new AchievementResponse()
                .setId(achievement.getId())
                .setName(achievement.getName())
                .setDescription(achievement.getDescription())
                .setPoints(achievement.getPoints());
    }

    @SneakyThrows
    public GetAchievementPictureResponse buildGetAchievementPictureResponse(Long id) {
        Achievement achievement = getAchievement(id).orElseThrow(NotFoundException::new);
        return new GetAchievementPictureResponse()
                .setPicture(achievement.getPicture());
    }

    @SneakyThrows
    public AchievementResponse createAchievement(OidcUser oidcUser, CreateAchievementRequest request) {
        User user = userService.findUserByOidcUser(oidcUser).orElseThrow(NotFoundException::new);
        Project project = user.getProjectsWithAdminRole().stream().findFirst().orElseThrow(NotFoundException::new);
        Achievement achievement = new Achievement();
        achievement.setName(request.getName());
        achievement.setDescription(request.getDescription());
        achievement.setPoints(request.getPoints());
        achievement.setPicture(request.getPicture());
        achievement.setProjects(Collections.singleton(project));
        achievement = achievementRepo.save(achievement);
        return buildAchievementResponse(achievement);
    }

    public Optional<Achievement> getAchievement(Long id) {
        return achievementRepo.findById(id);
    }

}
