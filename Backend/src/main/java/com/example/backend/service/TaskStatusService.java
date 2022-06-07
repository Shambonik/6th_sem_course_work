package com.example.backend.service;

import com.example.backend.dto.request.CreateStatusRequest;
import com.example.backend.dto.response.CreateStatusResponse;
import com.example.backend.dto.response.StatusResponse;
import com.example.backend.entities.Board;
import com.example.backend.entities.BoardTaskStatus;
import com.example.backend.entities.TaskStatus;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.repo.BoardTaskStatusRepo;
import com.example.backend.repo.TaskStatusRepo;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Сервис, выполняющий логику, связанную со статусами задач
 *
 * @author Danil Kuzin
 */
@Service
public class TaskStatusService {

    private final BoardService boardService;

    private final TaskStatusRepo taskStatusRepo;

    private final BoardTaskStatusRepo boardTaskStatusRepo;

    public TaskStatusService(@Lazy BoardService boardService, TaskStatusRepo taskStatusRepo, BoardTaskStatusRepo boardTaskStatusRepo) {
        this.boardService = boardService;
        this.taskStatusRepo = taskStatusRepo;
        this.boardTaskStatusRepo = boardTaskStatusRepo;
    }

    @SneakyThrows
    public List<StatusResponse> buildGetStatusesResponse(Long boardId) {
        Board board = boardService.getBoard(boardId).orElseThrow(NotFoundException::new);
        List<BoardTaskStatus> boardTaskStatusList = getBoardTaskStatusesByBoard(board);
        return boardTaskStatusList.stream()
                .map(this::buildStatusResponse)
                .collect(Collectors.toList());
    }

    @SneakyThrows
    public CreateStatusResponse create(Long boardId, CreateStatusRequest request) {
        Board board = boardService.getBoard(boardId).orElseThrow(NotFoundException::new);
        TaskStatus status = new TaskStatus();
        status.setValue(request.getValue());
        status = taskStatusRepo.save(status);
        BoardTaskStatus boardTaskStatus = new BoardTaskStatus();
        boardTaskStatus.setTaskStatus(status);
        boardTaskStatus.setBoard(board);
        boardTaskStatus.setOrder(request.getOrder());
        boardTaskStatusRepo.save(boardTaskStatus);
        return new CreateStatusResponse()
                .setId(status.getId())
                .setValue(status.getValue());
    }

    public StatusResponse buildStatusResponse(BoardTaskStatus boardStatus) {
        return new StatusResponse()
                .setId(boardStatus.getTaskStatus().getId())
                .setName(boardStatus.getTaskStatus().getValue())
                .setOrder(boardStatus.getOrder());
    }

    public List<BoardTaskStatus> getBoardTaskStatusesByBoard(Board board) {
        return boardTaskStatusRepo.findAllByBoardOrderByOrder(board);
    }

    public Optional<BoardTaskStatus> getBoardTaskStatusByBoardAndTaskStatus(Board board, TaskStatus taskStatus) {
        return boardTaskStatusRepo.findByBoardAndTaskStatus(board, taskStatus);
    }

    public Optional<TaskStatus> getTaskStatus(Long id) {
        return taskStatusRepo.findById(id);
    }

}
