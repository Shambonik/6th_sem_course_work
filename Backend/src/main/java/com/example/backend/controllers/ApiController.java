package com.example.backend.controllers;

import com.example.backend.dto.request.*;
import com.example.backend.dto.response.*;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.exceptions.ServerException;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ApiController {

    private final UserService userService;

    private final AchievementService achievementService;

    private final BoardService boardService;

    private final ProjectService projectService;

    private final TaskStatusService taskStatusService;

    private final TaskService taskService;

    private final UserProgressService userProgressService;

    @GetMapping("/me")
    public ResponseEntity<GetUserResponse> getUser(@AuthenticationPrincipal OidcUser user) {
        try {
            return new ResponseEntity<>(userService.buildGetUserResponse(user), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/me/personal")
    public ResponseEntity<GetUserAchievementsResponse> getUserAchievements(@AuthenticationPrincipal OidcUser user) {
        try {
            return new ResponseEntity<>(userService.buildGetUserAchievementsResponse(user), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/achievement/{id}/picture")
    public ResponseEntity<GetAchievementPictureResponse> getAchievementPicture(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, achievementService.getProjectByAchievementId(id));
            return new ResponseEntity<>(achievementService.buildGetAchievementPictureResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/project/{id}/board")
    public ResponseEntity<GetBoardsResponse> getBoards(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, projectService.getProject(id).orElseThrow(NotFoundException::new));
            return new ResponseEntity<>(boardService.buildGetBoardsResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/board/{id}")
    public ResponseEntity<GetBoardInfoResponse> getBoard(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, boardService.getProjectByBoardId(id));
            return new ResponseEntity<>(boardService.buildGetBoardInfoResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/project/access")
    public ResponseEntity<Void> grantAccess(@AuthenticationPrincipal OidcUser user, @RequestBody GrantAccessRequest request) {
        try {
            userService.validateAdminByProject(user, projectService.getProject(request.getProjectId()).orElseThrow(NotFoundException::new));
            projectService.grandAccess(request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/board")
    public ResponseEntity<CreateBoardResponse> createBoard(@AuthenticationPrincipal OidcUser user, @RequestBody CreateBoardRequest request) {
        try {
            userService.validateAdminByProject(user, projectService.getProject(request.getProjectId()).orElseThrow(NotFoundException::new));
            return new ResponseEntity<>(boardService.create(request), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/board/{id}/status")
    public ResponseEntity<CreateStatusResponse> createStatus(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id, @RequestBody CreateStatusRequest request) {
        try {
            userService.validateAdminByProject(user, boardService.getProjectByBoardId(id));
            return new ResponseEntity<>(taskStatusService.create(id, request), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/board/{id}/task")
    public ResponseEntity<TaskResponse> createTask(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id, @RequestBody CreateTaskRequest request) {
        try {
            userService.validateAccessByProject(user, boardService.getProjectByBoardId(id));
            return new ResponseEntity<>(taskService.create(user, id, request), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskResponse> getTask(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, taskService.getProjectByTaskId(id));
            return new ResponseEntity<>(taskService.getTaskResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<TaskResponse> editTask(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id, @RequestBody EditTaskRequest request) {
        try {
            userService.validateAccessByProject(user, taskService.getProjectByTaskId(id));
            return new ResponseEntity<>(taskService.edit(id, request), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/board/{id}/taskstatuses")
    public ResponseEntity<List<StatusResponse>> getTaskStatuses(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, boardService.getProjectByBoardId(id));
            return new ResponseEntity<>(taskStatusService.buildGetStatusesResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/achievement")
    public ResponseEntity<AchievementResponse> createAchievement(@AuthenticationPrincipal OidcUser user, @RequestBody CreateAchievementRequest request) {
        try {
            return new ResponseEntity<>(achievementService.createAchievement(user, request), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/achievement/{id}/assign")
    public ResponseEntity<Void> assignAchievement(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id, @RequestBody AssignAndDepriveAchievementRequest request) {
        try {
            userProgressService.assignAchievement(user, id, request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @PostMapping("/achievement/{id}/deprive")
    public ResponseEntity<Void> depriveAchievement(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id, @RequestBody AssignAndDepriveAchievementRequest request) {
        try {
            userProgressService.depriveAchievement(user, id, request);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectResponse> getProject(@AuthenticationPrincipal OidcUser user, @PathVariable("id") long id) {
        try {
            userService.validateAccessByProject(user, projectService.getProject(id).orElseThrow(NotFoundException::new));
            return new ResponseEntity<>(projectService.buildProjectResponse(id), HttpStatus.OK);
        } catch (Exception e) {
            return getResponseEntityByException(e);
        }
    }


    private <T> ResponseEntity<T> getResponseEntityByException(Exception e) {
        log.error("Server Exception " + e.getMessage());
        if (e instanceof ServerException) {
            return new ResponseEntity<T>(((ServerException) e).getHttpStatus());
        }
        return new ResponseEntity<T>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
