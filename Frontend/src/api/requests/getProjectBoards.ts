import { get } from 'lodash';
import { PrimaryBoardInfo } from '../../store/types/typeUser';
import { instance } from './../instance';

export const getProjectBoards = async (projectId: number) => {
    const response = await instance.get(`/api/project/${projectId}/board`);

    return (get(response, 'data.boards') || []) as PrimaryBoardInfo[];
};
