import { Achievement } from './typeUser';

export interface Project {
    id: number;
    name: string;
    description: string;
    achievements: Achievement[];
}

export interface StateProject {
    project?: Project | undefined;
}

export enum ListTypeProjectActions {
    SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
    ADD_ACHIEVEMENT_TO_PROJECT = 'ADD_ACHIEVEMENT_TO_PROJECT',
    SHOW_PICTURE_ACHIEVEMENT_PROJECT = 'SHOW_PICTURE_ACHIEVEMENT_PROJECT',
}

interface SetCurrentProject {
    type: ListTypeProjectActions.SET_CURRENT_PROJECT;
    project: Project;
}

interface AddAchievementToProject {
    type: ListTypeProjectActions.ADD_ACHIEVEMENT_TO_PROJECT;
    achievement: Achievement;
}

interface ShowPictureAchievementProject {
    type: ListTypeProjectActions.SHOW_PICTURE_ACHIEVEMENT_PROJECT;
    achievementId: number;
    picture: string;
}

export type ActionProject = SetCurrentProject
    | AddAchievementToProject
    | ShowPictureAchievementProject;
