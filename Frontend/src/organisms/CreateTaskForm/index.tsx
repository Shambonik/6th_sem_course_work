import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { CreateTaskSchema, validationSchema } from './schema';
import { useSnackbar } from 'notistack';

import './index.css';
import { api } from '../../api';
import { get } from 'lodash';
import { createPathToTask } from '../../common/path';

interface CreateTaskFormProps {
    dashboardId: number
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({ dashboardId }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const initialValues: CreateTaskSchema = useMemo(() => ({
        name: '',
        description: '',
        storyPoints: 0,
        executorEmail: '',
    }), [dashboardId]);

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const onSubmit = useCallback(async (values: CreateTaskSchema) => {
        setIsSubmiting(true);

        try {
            const { id: taskId } = await api.createTask({ boardId: dashboardId, data: values });
            history.push(createPathToTask(taskId));
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }

        setIsSubmiting(false);
    }, [dispatch, enqueueSnackbar, history]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form className="CreateTaskForm" onSubmit={formik.handleSubmit}>
            <TextField
                label="Название"
                name="name"
                variant="outlined"
                className="CreateTaskForm__marginBottom"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                label="Описание"
                name="description"
                variant="outlined"
                className="CreateTaskForm__marginBottom"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                minRows={3}
                maxRows={Infinity}
            />
            <TextField
                label="StoryPoints"
                name="storyPoints"
                type="number"
                variant="outlined"
                className="CreateTaskForm__marginBottom"
                value={formik.values.storyPoints}
                onChange={formik.handleChange}
                error={formik.touched.storyPoints && Boolean(formik.errors.storyPoints)}
                helperText={formik.touched.storyPoints && formik.errors.storyPoints}
            />
            <TextField
                label="Email исполнителя"
                name="executorEmail"
                variant="outlined"
                className="CreateTaskForm__marginBottom"
                value={formik.values.executorEmail}
                onChange={formik.handleChange}
                error={formik.touched.executorEmail && Boolean(formik.errors.executorEmail)}
                helperText={formik.touched.executorEmail && formik.errors.executorEmail}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={isSubmiting}
            >
                Создать
            </Button>
        </form>
    );
};

export default CreateTaskForm;
