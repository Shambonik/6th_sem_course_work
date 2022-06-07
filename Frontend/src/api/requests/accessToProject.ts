import { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { ERROR_NOT_FOUND_USER } from '../../common/errors';
import { instance } from './../instance';

interface Args {
    data: {
        email: string;
        projectId: number;
    };
}

export const accessToProject = async ({ data }: Args) => {
    try {
        await instance.post<null>('/api/project/access', data);
    } catch (error) {
        const response = get(error, 'response') as AxiosResponse | undefined;

        if (response.status === 404) {
            throw ERROR_NOT_FOUND_USER;
        }
        
        throw 'Неизвестная ошибка';
    }
};
