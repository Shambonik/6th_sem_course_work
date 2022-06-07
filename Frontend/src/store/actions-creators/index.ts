import * as user from './user';
import * as board from './board';
import * as task from './task';
import * as project from './project';

const actionsCreators = {
    ...user,
    ...board,
    ...task,
    ...project,
};

export default actionsCreators;
