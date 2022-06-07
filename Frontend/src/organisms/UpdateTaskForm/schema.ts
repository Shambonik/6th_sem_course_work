import * as yup from 'yup';

export interface UpdateTaskSchema {
    name: string;
    description: string;
    storyPoints: number;
    executorEmail?: string;
    statusId: number;
}

export const validationSchema: yup.SchemaOf<UpdateTaskSchema> = yup.object({
    name: yup
        .string()
        .min(5, 'Минимальная длина имени 5 символов')
        .max(30, 'Максимальная длина имени 30 символов')
        .required('Название обязательно'),
    description: yup
        .string()
        .max(5000, 'Максимальная длина описания 5000 символов'),
    storyPoints: yup
        .number()
        .min(0, 'Минимальное значение сторипоинтов 0')
        .required('Сторипоинты'),
    executorEmail: yup
        .string()
        .email('Должно быть в формате email'),
    statusId: yup
        .number()
        .required(),
});
