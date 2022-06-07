import pMap from 'p-map';
import { AppDispatch } from '..';
import { api } from '../../api';
import actionsCreators from '../actions-creators';

export const setCurrentProject = (projectId: number) => 
    async (dispatch: AppDispatch) => {
        const project = await api.getProjectInfo({ projectId });

        dispatch(actionsCreators.setCurrentProject(project));

        await pMap(project.achievements, async (achivement) => {
            const picture = await api.getAchievementPicture(achivement.id);
            dispatch(actionsCreators.showPictureAchievementProject(achivement.id, picture));
        }, { concurrency: 4});
    };
