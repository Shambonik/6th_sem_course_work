import { get } from 'lodash';
import { instance } from './../instance';

export const getAchievementPicture = async (achievementId: number) => {
    const response = await instance.get(`/api/achievement/${achievementId}/picture`);

    return (get(response, 'data.picture')) as string | undefined;
};
