import { Board } from './../../store/types/typeDashboard';
import { instance } from './../instance';

export const getBoard = async (boardId: number) => {
    const response = await instance.get<Board>(`/api/board/${boardId}`);

    return response.data;
};
