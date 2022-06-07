import * as user from './user';
import * as board from './board';
import * as task from './task';
import * as project from './project';

export const thunkCreators = {
    ...user,
    ...board,
    ...task,
    ...project,
};
