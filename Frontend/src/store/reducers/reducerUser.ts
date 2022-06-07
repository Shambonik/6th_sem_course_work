import { ActionUser, ListTypeUserActions, StateUser } from './../types/typeUser';

const initialState: StateUser = {
    user: undefined,
    boards: [],
};

export const reducerUser = (
    state: StateUser = initialState,
    action: ActionUser
): StateUser => {
    switch (action.type) {
        case ListTypeUserActions.SET_USER_INFO:
            return {
                ...state,
                user: action.user,
            };
        
        case ListTypeUserActions.SET_ACHIEVEMENTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    achievements: action.achievements,
                },
            };

        case ListTypeUserActions.DEPRIVE_ACHIEVEMENT:
            return {
                ...state,
                user: {
                    ...state.user,
                    achievements: state.user?.achievements?.filter(({ id }) => id !== action.achievementId),
                },
            };
                
        case ListTypeUserActions.SET_ACHIEVEMENT_PICTURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    achievements: state.user.achievements.map(achievement => {
                        if (achievement.id === action.achievementId) {
                            return {
                                ...achievement,
                                picture: action.picture,
                            };
                        }

                        return achievement;
                    }),
                },
            };

            
        case ListTypeUserActions.SET_PROJECT_BOARDS:
            return {
                ...state,
                boards: action.boards,
            };
    
        default:
            return state;
    }
};
