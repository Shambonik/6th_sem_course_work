import { instance } from './../instance';

interface Args {
    boardId: number;
    data: {
        value: string;
        order: number;
    }
}

interface Response {
    id: number;
    value: string;
}

export const addStatus = async ({boardId, data}: Args) => {
    const response = await instance.post<Response>(`/api/board/${boardId}/status`, data);

    return response.data;
};
