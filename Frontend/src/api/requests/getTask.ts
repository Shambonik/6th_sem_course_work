import { instance } from './../instance';
import { CurrentTask } from './../../store/types/typeTask';

interface Args {
    taskId: number;
}

type Response = CurrentTask;

export const getTask = async ({ taskId }: Args) => {
    const response = await instance.get<Response>(`/api/task/${taskId}`);

    return response.data;
};
