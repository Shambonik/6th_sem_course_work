import * as yup from 'yup';

export interface CreateAchievementSchema {
    name: string;
    description: string;
    points: number;
    picture: string;
}

export const validationSchema: yup.SchemaOf<CreateAchievementSchema> = yup.object({
    name: yup
        .string()
        .min(5, 'Минимальная длина имени 5 символов')
        .max(30, 'Максимальная длина имени 30 символов')
        .required('Название обязательно'),
    description: yup
        .string()
        .max(100, 'Максимальная длина описания 100 символов'),
    points: yup
        .number()
        .min(0, 'Минимальное значение очков опыта 0')
        .required('Очки опыта обязательны'),
    picture: yup
        .string()
        .required('Картинка обязательная'),
});
