export const PAGE_TASK = '/task/:taskId';
export const PAGE_TASK_CREATE = '/task/create';
export const PAGE_PROFILE = '/profile';
export const PAGE_PROJECT = '/project';
export const PAGE_DASHBOARD = '/dashboard';
export const PAGE_DASHBOARD_CREATE = '/dashboard/create';
export const PAGE_DASHBOARD_ID = '/dashboard/:dashboardId';
export const PAGE_LOGOUT = '/logout';

export const parametrs = {
    DASHBOARD_ID: 'dashboardId',
    ACHIEVEMENT_ID: 'achievementId',
    ACHIEVEMENT_CREATE: 'achievementCreate',
};

export const createPathToProfileAchievement = (achievementId: number) =>
    `${PAGE_PROFILE}?achievementId=${achievementId}`;

export const createPathToDashboard = (dashboardId: number) =>
    `/dashboard/${dashboardId}`;

export const createPathToCreateTask = (dashboardId: number) =>
    `/task/create?dashboardId=${dashboardId}`;

export const createPathToTask = (taskId: number) =>
    `/task/${taskId}`;

export const PATH_CREATE_ACHIEVEMENT_TO_PROJECT = `${PAGE_PROJECT}?${parametrs.ACHIEVEMENT_CREATE}=true`;
