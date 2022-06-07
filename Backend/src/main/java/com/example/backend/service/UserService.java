package com.example.backend.service;

import com.example.backend.dto.response.GetUserAchievementsResponse;
import com.example.backend.dto.response.GetUserResponse;
import com.example.backend.dto.response.UserShortResponse;
import com.example.backend.entities.GoogleUserInfo;
import com.example.backend.entities.Project;
import com.example.backend.entities.User;
import com.example.backend.entities.UserProgress;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Сервис, выполняющий логику, связанную с пользователями
 *
 * @author Danil Kuzin
 */
@Service
@RequiredArgsConstructor
public class UserService extends OidcUserService {

    private final UserRepo userRepo;

    private final ProjectService projectService;

    private final UserProgressService userProgressService;

    private final AchievementService achievementService;

    @SneakyThrows
    public void validateAccessByProject(OidcUser oidcUser, Project project) {
        if (project.getUsers().stream().anyMatch(user -> user.getEmail().equals(oidcUser.getEmail()))) {
            return;
        }
        throw new ForbiddenException();
    }

    @SneakyThrows
    public void validateAdminByProject(OidcUser oidcUser, Project project) {
        if (project.getAdmins().stream().anyMatch(admin -> admin.getEmail().equals(oidcUser.getEmail()))) {
            return;
        }
        throw new ForbiddenException();
    }

    /**
     * Возвращает пользователя по адресу электронной почты
     *
     * @param email - email пользователя
     * @return Пользователь
     */
    public Optional<User> findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @SneakyThrows
    public GetUserResponse buildGetUserResponse(OidcUser oidcUser) {
        Optional<User> userOptional = findUserByOidcUser(oidcUser);
        User user = userOptional.orElseThrow(NotFoundException::new);
        GetUserResponse response = new GetUserResponse()
                .setId(user.getId())
                .setName(user.getName())
                .setPicture(user.getPicture())
                .setEmail(user.getEmail());
        Optional<Project> projectOptional = user.getProjects().stream().findFirst();
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            UserProgress userProgress = user.getUserProgressSet().stream().findFirst().orElseGet(() -> userProgressService.createUserProgress(project, user));
            return response
                    .setLevel(userProgress.getLevel())
                    .setPoints(userProgress.getPoints())
                    .setPointsToLevelUp(userProgressService.getPointsToLevelUp(userProgress))
                    .setProject(projectService.buildProjectShortResponse(project))
                    .setRole(projectService.getUserProjectRole(user, project));
        }
        return response;
    }

    @SneakyThrows
    public GetUserAchievementsResponse buildGetUserAchievementsResponse(OidcUser oidcUser) {
        Optional<User> userOptional = findUserByOidcUser(oidcUser);
        User user = userOptional.orElseThrow(NotFoundException::new);
        UserProgress userProgress = user.getUserProgressSet().stream().findFirst().orElseThrow(NotFoundException::new);
        return new GetUserAchievementsResponse()
                .setAchievements(userProgress.getAchievements()
                        .stream()
                        .map(achievementService::buildAchievementResponse)
                        .collect(Collectors.toList()));
    }

    public UserShortResponse buildUserShortResponse(User user) {
        return new UserShortResponse()
                .setName(user.getName())
                .setPicture(user.getPicture());
    }

    public Optional<User> findUserByOidcUser(OidcUser oidcUser) {
        return userRepo.findById(new GoogleUserInfo(oidcUser.getAttributes()).getId());
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        try {
            return processOidcUser(oidcUser);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OidcUser processOidcUser(OidcUser oidcUser) {
        GoogleUserInfo googleUserInfo = new GoogleUserInfo(oidcUser.getAttributes());
        Optional<User> userOptional = userRepo.findById(googleUserInfo.getId());
        if (userOptional.isEmpty()) {
            User user = new User();
            user.setId(googleUserInfo.getId());
            user.setEmail(googleUserInfo.getEmail());
            user.setName(googleUserInfo.getName());
            user.setPicture(googleUserInfo.getPicture());
            userRepo.save(user);
        }
        return oidcUser;
    }

}
