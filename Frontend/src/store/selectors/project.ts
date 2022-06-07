import { RootState } from './../reducers/index';

export const getCurrentProject = (state: RootState) => state.reducerProject.project;
