package com.example.backend.service;

import com.example.backend.dto.request.CreateBoardRequest;
import com.example.backend.dto.response.BoardShortResponse;
import com.example.backend.dto.response.CreateBoardResponse;
import com.example.backend.dto.response.GetBoardInfoResponse;
import com.example.backend.dto.response.GetBoardsResponse;
import com.example.backend.entities.Board;
import com.example.backend.entities.Project;
import com.example.backend.entities.TaskStatus;
import com.example.backend.entities.enums.BoardStatus;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.BoardRepo;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Сервис, выполняющий логику, связанную с досками задач
 *
 * @author Danil Kuzin
 */
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepo boardRepo;

    private final TaskStatusService taskStatusService;

    private final TaskService taskService;

    private final ProjectService projectService;

    @SneakyThrows
    public CreateBoardResponse create(CreateBoardRequest request) {
        Board board = new Board();
        Project project = projectService.getProject(request.getProjectId()).orElseThrow(NotFoundException::new);
        board.setName(request.getName());
        board.setDescription(request.getDescription());
        board.setProject(project);
        board = boardRepo.save(board);
        return new CreateBoardResponse()
                .setBoardId(board.getId())
                .setName(board.getName())
                .setDescription(board.getDescription());
    }

    @SneakyThrows
    public Project getProjectByBoardId(Long id) {
        Board board = getBoard(id).orElseThrow(NotFoundException::new);
        return board.getProject();
    }

    public GetBoardsResponse buildGetBoardsResponse(Long projectId) {
        return new GetBoardsResponse().setBoards(
                findBoardsByProjectId(projectId).stream()
                        .map(this::buildBoardShortResponse)
                        .collect(Collectors.toList())

        );
    }

    public BoardShortResponse buildBoardShortResponse(Board board) {
        return new BoardShortResponse()
                .setId(board.getId())
                .setName(board.getName());
    }

    @SneakyThrows
    public GetBoardInfoResponse buildGetBoardInfoResponse(Long boardId) {
        Board board = getBoard(boardId).orElseThrow(NotFoundException::new);
        return new GetBoardInfoResponse()
                .setId(board.getId())
                .setName(board.getName())
                .setDescription(board.getDescription())
                .setStatuses(board.getBoardTaskStatuses().stream()
                        .map(taskStatusService::buildStatusResponse)
                        .collect(Collectors.toList())
                )
                .setTasks(board.getTasks().stream()
                        .map(taskService::buildTaskShortResponse)
                        .collect(Collectors.toList())
                );
    }

    public Optional<Board> getBoard(Long id) {
        return boardRepo.findById(id);
    }

    public List<Board> findBoardsByProjectId(Long projectId) {
        return boardRepo.findAllByProjectId(projectId);
    }

}
