import { instance } from './../instance';
import { Project } from './../../store/types/typeProject';

interface Args {
    projectId: number;
}

type Response = Project

export const getProjectInfo = async ({ projectId }: Args) => {
    const response = await instance.get<Response>(`/api/project/${projectId}`);

    return response.data;
};
