import { AppDispatch } from '..';
import { api } from '../../api';
import actionsCreators from '../actions-creators';

export const setBoard = (boardId: number) => 
    async (dispatch: AppDispatch) => {
        const board = await api.getBoard(boardId);

        dispatch(actionsCreators.setBoard(board));
    };
