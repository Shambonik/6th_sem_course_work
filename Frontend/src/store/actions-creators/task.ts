import { Status } from '../types/typeDashboard';
import { CurrentTask, ActionCurrentTask, ListTypeTaskActions } from './../types/typeTask';

export const setTask = (task: CurrentTask): ActionCurrentTask => ({
    type: ListTypeTaskActions.SET_CURRENT_TASK,
    task,
});

export const setTaskStatuses = (taskStatuses: Status[]): ActionCurrentTask => ({
    type: ListTypeTaskActions.SET_TASK_STATUSES,
    taskStatuses,
});
