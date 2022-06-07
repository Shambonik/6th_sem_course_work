import pMap from 'p-map';
import { api } from '../../api';
import actionsCreators from '../actions-creators';
import { AppDispatch } from '../index';

export const setMainUserInfo = () => 
    async (dispatch: AppDispatch) => {
        const user = await api.getUserInfo();

        dispatch(actionsCreators.setUserInfo(user));

        const boards = await api.getProjectBoards(user.project.id);

        dispatch(actionsCreators.setProjectBoards(boards));
    };

export const setUserAchivements = () => 
    async (dispatch: AppDispatch) => {
        const achivements = await api.getUserAchivements();

        dispatch(actionsCreators.setAchievements(achivements));

        await pMap(achivements, async (achivement) => {
            const picture = await api.getAchievementPicture(achivement.id);
            dispatch(actionsCreators.setAchievementPicture(achivement.id, picture));
        }, { concurrency: 4});
    };