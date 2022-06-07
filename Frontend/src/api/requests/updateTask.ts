import { instance } from './../instance';
import { CurrentTask } from './../../store/types/typeTask';

export interface UpdateTaskData {
    name?: string;
    description?: string;
    storyPoints?: number;
    executorEmail?: string;
    statusId?: number;
}

interface Args {
    taskId: number;
    data: UpdateTaskData;
}

type Response = CurrentTask;

export const updateTask = async ({ taskId, data }: Args) => {
    const response = await instance.put<Response>(`/api/task/${taskId}`, data);

    return response.data;
};
