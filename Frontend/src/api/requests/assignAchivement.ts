import { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { ERROR_NOT_FOUND_USER } from '../../common/errors';
import { instance } from './../instance';

interface Args {
    achievementId: number;
    data: {
        email: string;
    }
}

export const assignAchivement =async ({ achievementId, data }: Args) => {
    try {
        await instance.post<null>(`/api/achievement/${achievementId}/assign`, data);
    } catch (error) {
        const response = get(error, 'response') as AxiosResponse | undefined;

        if (response.status === 404) {
            throw ERROR_NOT_FOUND_USER;
        }
    }
};
