import { instance } from './../instance';
import { Achievement } from '../../store/types/typeUser';
import { get } from 'lodash';

export const getUserAchivements = async (): Promise<Achievement[]> => {
    const response = await instance.get('/api/me/personal');

    return (get(response, 'data.achievements') || []) as Achievement[];
};
