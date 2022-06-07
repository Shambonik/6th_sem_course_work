import { StateProject, ListTypeProjectActions, ActionProject } from './../types/typeProject';

const initialState: StateProject = {};

export const reducerProject = (
    state: StateProject = initialState,
    action: ActionProject,
): StateProject => {
    switch (action.type) {
        case ListTypeProjectActions.SET_CURRENT_PROJECT:
            return {
                ...state,
                project: action.project,
            };
        
        case ListTypeProjectActions.SHOW_PICTURE_ACHIEVEMENT_PROJECT:
            return {
                ...state,
                project: {
                    ...state.project,
                    achievements: state.project?.achievements?.map(achievement => {
                        if (achievement.id === action.achievementId) {
                            return {
                                ...achievement,
                                picture: action.picture,
                            };
                        }

                        return achievement;
                    }),
                }
            };
        
        case ListTypeProjectActions.ADD_ACHIEVEMENT_TO_PROJECT:
            return {
                ...state,
                project: {
                    ...state.project,
                    achievements: [
                        ...state.project.achievements,
                        action.achievement,
                    ],
                },
            };

        default:
            return state;
    }
};
