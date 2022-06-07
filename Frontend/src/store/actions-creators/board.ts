import { ActionBoard, Board, ListTypeBoardActions, Status } from './../types/typeDashboard';

export const setBoard = (board: Board): ActionBoard => ({
    type: ListTypeBoardActions.SET_CURRENT_BOARD,
    board,
});

export const addStatus = (status: Status): ActionBoard => ({
    type: ListTypeBoardActions.ADD_STATUS,
    status,
});

export const changeTaskStatus = (statusId: number, taskId: number): ActionBoard => ({
    type: ListTypeBoardActions.CHANGE_TASK_STATUS,
    statusId,
    taskId,
});
