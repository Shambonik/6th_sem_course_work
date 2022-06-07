import { depriveAchivement } from './depriveAchivement';
import { assignAchivement } from './assignAchivement';
import { createAchivement } from './createAchivement';
import { updateTask } from './updateTask';
import { accessToProject } from './accessToProject';
import { addStatus } from './addStatus';
import { createBoard } from './createBoard';
import { createTask } from './createTask';
import { getTask } from './getTask';
import { getAchievementPicture } from './getAchievementPicture';
import { getBoard } from './getBoard';
import { getProjectBoards } from './getProjectBoards';
import { getUserAchivements } from './getUserAchivements';
import { getUserInfo } from './getUserInfo';
import { getTaskStatuses } from './getTaskStatuses';
import { getProjectInfo } from './getProjectInfo';


export const api = {
    getUserInfo,
    getUserAchivements,
    getProjectBoards,
    getAchievementPicture,
    getBoard,
    getTask,
    createTask,
    createBoard,
    addStatus,
    accessToProject,
    updateTask,
    getTaskStatuses,
    createAchivement,
    assignAchivement,
    depriveAchivement,
    getProjectInfo,
};
