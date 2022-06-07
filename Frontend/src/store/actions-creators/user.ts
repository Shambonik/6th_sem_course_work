import { Achievement, ActionUser, ListTypeUserActions, PrimaryBoardInfo, User } from '../types/typeUser';

export const setUserInfo = (user: User): ActionUser => {
    return {
        type: ListTypeUserActions.SET_USER_INFO,
        user,
    };
};

export const setAchievements = (achievements: Achievement[]): ActionUser => {
    return {
        type: ListTypeUserActions.SET_ACHIEVEMENTS,
        achievements,
    };
};

export const setAchievementPicture = (achievementId: number, picture: string): ActionUser => {
    return {
        type: ListTypeUserActions.SET_ACHIEVEMENT_PICTURE,
        achievementId,
        picture,
    };
};

export const setProjectBoards = (boards: PrimaryBoardInfo[]): ActionUser => {
    return {
        type: ListTypeUserActions.SET_PROJECT_BOARDS,
        boards,
    };
};

export const depriveAchivement = (achievementId: number): ActionUser => {
    return {
        type: ListTypeUserActions.DEPRIVE_ACHIEVEMENT,
        achievementId,
    };
};
