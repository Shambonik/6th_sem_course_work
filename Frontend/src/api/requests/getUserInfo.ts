import { User } from '../../store/types/typeUser';
import { instance } from '../instance';

export const getUserInfo = async (): Promise<User> => {
    const response = await instance.get('/api/me');

    return response.data as User;
};
