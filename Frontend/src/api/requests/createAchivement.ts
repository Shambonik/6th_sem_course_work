import { instance } from './../instance';
import { Achievement } from './../../store/types/typeUser';

interface Args {
    data: {
        name: string;
        description: string;
        points: number;
        picture: string;
    }
}

type Response = Achievement;

export const createAchivement = async ({ data }: Args) => {
    const response = await instance.post<Response>('/api/achievement', data);

    return response.data;
};
