import { instance } from './../instance';
import { CurrentTask } from './../../store/types/typeTask';
interface Args {
    boardId: number;
    data: {
        name: string;
        description: string;
        storyPoints: number;
        executorEmail: string;
    }
}

type Response = CurrentTask;

export const createTask = async ({boardId, data}: Args) => {
    const response = await instance.post<Response>(`/api/board/${boardId}/task`, data);

    return response.data;
};
