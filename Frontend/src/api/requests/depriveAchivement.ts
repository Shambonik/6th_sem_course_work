import { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { ERROR_HAVE_NOT_ACHIVEMENT, ERROR_NOT_FOUND_USER } from '../../common/errors';
import { instance } from './../instance';

interface Args {
    achievementId: number;
    data: {
        email: string;
    }
}

const mapStatusToError: Record<number, string> = {
    [404]: ERROR_NOT_FOUND_USER,
    [400]: ERROR_HAVE_NOT_ACHIVEMENT,
};

export const depriveAchivement = async ({ achievementId, data }: Args) => {
    try {
        await instance.post<null>(`/api/achievement/${achievementId}/deprive`, data);
    } catch (error) {
        const response = get(error, 'response') as AxiosResponse | undefined;

        const errorMessage = mapStatusToError[response.status];

        if (errorMessage) {
            throw errorMessage;
        }

        throw error;
    }
};
