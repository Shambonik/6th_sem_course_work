import { Status } from './typeDashboard';

export interface CurrentTask {
    id: number;
    name: string;
    description: string;
    status: string;
    storyPoints: number;
    boardId: number;
    executor: {
        name: string;
        picture?: string;
    }
}

export interface StateTask {
    task?: CurrentTask;
    taskStatuses: Status[];
}

export enum ListTypeTaskActions {
    SET_CURRENT_TASK = 'SET_CURRENT_TASK',
    SET_TASK_STATUSES = 'SET_TASK_STATUSES',
}

interface SetCurrentTask {
    type: ListTypeTaskActions.SET_CURRENT_TASK;
    task: CurrentTask;
}

interface SetTaskStatuses {
    type: ListTypeTaskActions.SET_TASK_STATUSES;
    taskStatuses: Status[];
}

export type ActionCurrentTask = SetCurrentTask | SetTaskStatuses; 
