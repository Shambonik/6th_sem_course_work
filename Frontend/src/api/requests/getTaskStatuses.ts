import { instance } from './../instance';
import { Status } from './../../store/types/typeDashboard';

interface Args {
    boardId: number;
}

type Response = Status[];

export const getTaskStatuses =async ({ boardId }: Args) => {
    const response = await instance.get<Response>(`/api/board/${boardId}/taskstatuses`);

    return response.data;
};
