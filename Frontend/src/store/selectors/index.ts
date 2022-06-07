import * as user from './user';
import * as board from './board';
import * as project from './project';
import * as task from './task';

export const selectors = {
    ...user,
    ...board,
    ...task,
    ...project,
};
