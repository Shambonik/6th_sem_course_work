import { StateTask, ActionCurrentTask, ListTypeTaskActions } from './../types/typeTask';

const initialState: StateTask = {
    task: {
        id: 1,
        name: 'Название',
        description: 'Описание описание описание описание описание описание описание',
        status: 'Открыто',
        storyPoints: 0.5,
        boardId: 1,
        executor: {
            name: 'Фамилия Евгений Валерьевич',
        }
    },
    taskStatuses: [
        {
            id: 1,
            name: 'Открыто',
            order: 1,
        },
        {
            id: 2,
            name: 'Работа',
            order: 2,
        },
    ],
};

export const reduserCurrentTask = (
    state: StateTask = initialState,
    action: ActionCurrentTask,
): StateTask => {
    switch (action.type) {
        case ListTypeTaskActions.SET_CURRENT_TASK:
            return {
                ...state,
                task: action.task,
            };
        case ListTypeTaskActions.SET_TASK_STATUSES:
            return {
                ...state,
                taskStatuses: action.taskStatuses,
            };

        default:
            return state;
    }
};
