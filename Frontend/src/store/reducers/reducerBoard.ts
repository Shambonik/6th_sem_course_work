import { StateBoard, ActionBoard, ListTypeBoardActions } from './../types/typeDashboard';


const initialState: StateBoard = {};

export const reducerBoard = (
    state: StateBoard = initialState,
    action: ActionBoard,
): StateBoard => {
    switch (action.type) {
        case ListTypeBoardActions.SET_CURRENT_BOARD:
            return {
                ...state,
                board: action.board,
            };

        case ListTypeBoardActions.CHANGE_TASK_STATUS:
            return {
                ...state,
                board: {
                    ...state.board,
                    tasks: state.board?.tasks?.map((task) => {
                        if (task.id === action.taskId) {
                            return {
                                ...task,
                                statusId: action.statusId,
                            };
                        }

                        return task;
                    }),
                },
            };
        
            
        case ListTypeBoardActions.ADD_STATUS:
            return {
                ...state,
                board: {
                    ...state?.board,
                    statuses: [
                        ...(state?.board?.statuses || []),
                        action.status
                    ],
                },
            };

        default:
            return state;
    }
};
