import { instance } from './../instance';
interface CreateBoardArgs {
    projectId: number;
    name: string;
    description: string;
}

interface Response {
    boardId: number;
    name: string;
    description: string;
}

export const createBoard = async (args: CreateBoardArgs) => {
    const response = await instance.post<Response>('/api/board', args);

    return response.data;
};
