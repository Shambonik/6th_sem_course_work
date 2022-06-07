import * as yup from 'yup';

export interface CreateDashboardSchema {
    name: string;
    description: string;
}

export const validationSchema: yup.SchemaOf<CreateDashboardSchema> = yup.object({
    name: yup
        .string()
        .min(1, 'Минимальная длина имени 1 символов')
        .max(15, 'Максимальная длина имени 15 символов')
        .required('Название обязательно'),
    description: yup
        .string()
        .max(5000, 'Максимальная длина описания 5000 символов'),
});
