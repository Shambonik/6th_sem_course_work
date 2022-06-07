import { reducerUser } from './reducerUser';
import { combineReducers } from 'redux';
import { reducerBoard } from './reducerBoard';
import { reduserCurrentTask } from './reduserCurrentTask';
import { reducerProject } from './reducerProject';

export const rootReducer = combineReducers({
    reducerUser,
    reducerBoard,
    reduserCurrentTask,
    reducerProject,
});

export type RootState = ReturnType<typeof rootReducer>
