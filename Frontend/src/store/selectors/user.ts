import { RootState } from '../reducers';
import { User } from '../types/typeUser';

export const selectUser = (state: RootState): User | undefined => state.reducerUser.user;

export const selectPrimaryBoards = (state: RootState) => state.reducerUser.boards;
