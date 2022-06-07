export interface Achievement {
    id: number;
    name: string;
    description: string;
    points: number;
    picture: string;
}

export interface User {
    id: string;
    picture?: string;
    name: string;
    email: string;
    level: number;
    role: UserRole;
    pointsToLevelUp: number;
    points: number;
    project: {
        id: number;
        name?: string;
    }
    achievements?: Achievement[];
}

export type PrimaryBoardInfo = {
    id: number;
    name: string;
}

export enum UserRole {
    PROJECT_ADMIN = 'PROJECT_ADMIN',
    PROJECT_USER = 'PROJECT_USER',
}

export type StateUser = {
    user?: User;
    boards: PrimaryBoardInfo[];
};

export enum ListTypeUserActions {
    SET_USER_INFO = 'SET_USER_INFO',
    SET_ACHIEVEMENTS = 'SET_ACHIEVEMENTS',
    SET_ACHIEVEMENT_PICTURE = 'SET_ACHIEVEMENT_PICTURE',
    SET_PROJECT_BOARDS = 'SET_PROJECT_BOARDS',
    DEPRIVE_ACHIEVEMENT = 'DEPRIVE_ACHIEVEMENT',
}

interface SetUserInfo {
    type: ListTypeUserActions.SET_USER_INFO;
    user: User;
}

interface SetAchievements {
    type: ListTypeUserActions.SET_ACHIEVEMENTS;
    achievements?: Achievement[];
}

interface SetAchievementPicture {
    type: ListTypeUserActions.SET_ACHIEVEMENT_PICTURE;
    achievementId: number;
    picture: string;
}

interface SetProjectBoards {
    type: ListTypeUserActions.SET_PROJECT_BOARDS;
    boards: PrimaryBoardInfo[];
}

interface DepriveAchivement {
    type: ListTypeUserActions.DEPRIVE_ACHIEVEMENT;
    achievementId: number;
}

export type ActionUser = SetUserInfo | 
    SetAchievements |
    SetAchievementPicture |
    SetProjectBoards |
    DepriveAchivement;
