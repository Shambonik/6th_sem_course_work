import { CurrentTask } from '../types/typeTask';
import { RootState } from './../reducers/index';

export const getCurrentTask = (state: RootState): CurrentTask | undefined => state.reduserCurrentTask.task;

export const getTaskStatuses = (state: RootState) => state.reduserCurrentTask.taskStatuses;
