import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { UpdateTaskSchema, validationSchema } from './schema';
import { useSnackbar } from 'notistack';

import './index.css';
import { api } from '../../api';
import { get } from 'lodash';
import actionsCreators from '../../store/actions-creators';
import { UpdateTaskData } from '../../api/requests/updateTask';
import { Status } from '../../store/types/typeDashboard';
import Select, { SelectOption } from '../../molecules/Select';

interface UpdateTaskFormProps {
    taskId: number;
    taskStatuses: Status[];
    initialValues: {
        name?: string;
        description?: string;
        storyPoints?: number;
        executorEmail?: string;
        statusId?: number;
    };
    onSubmit: (values: UpdateTaskData) => void;
    onClose: () => void;
}

const UpdateTaskForm: FC<UpdateTaskFormProps> = ({ onClose, taskId, initialValues, taskStatuses, onSubmit }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const optionsStatus = useMemo(() => {
        return taskStatuses.map(({ name, id }): SelectOption => ({
            value: String(id),
            item: name,
        }));
    }, [taskStatuses]);


    const handleSubmit = useCallback(async (values: UpdateTaskSchema) => {
        setIsSubmiting(true);

        try {
            const task = await api.updateTask({ taskId, data: values });
    
            dispatch(actionsCreators.setTask(task));
            onSubmit(values);
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }

        setIsSubmiting(false);
    }, [dispatch, enqueueSnackbar, history, taskId]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleChangeStatus = useCallback(async (statusId: string) => {
        await formik.setFieldValue('statusId', Number(statusId));
    }, [formik.setFieldValue ,taskStatuses]);

    return (
        <form className="UpdateTaskForm" onSubmit={formik.handleSubmit}>
            <TextField
                label="Название"
                name="name"
                variant="outlined"
                className="UpdateTaskForm__marginBottom"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                label="Описание"
                name="description"
                variant="outlined"
                className="UpdateTaskForm__marginBottom"
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
                className="UpdateTaskForm__marginBottom"
                value={formik.values.storyPoints}
                onChange={formik.handleChange}
                error={formik.touched.storyPoints && Boolean(formik.errors.storyPoints)}
                helperText={formik.touched.storyPoints && formik.errors.storyPoints}
            />
            <TextField
                label="Email исполнителя"
                name="executorEmail"
                variant="outlined"
                className="UpdateTaskForm__marginBottom"
                value={formik.values.executorEmail}
                onChange={formik.handleChange}
                error={formik.touched.executorEmail && Boolean(formik.errors.executorEmail)}
                helperText={formik.touched.executorEmail && formik.errors.executorEmail}
            />
            <Select
                className="UpdateTaskForm__marginBottom"
                value={formik.values.statusId}
                options={optionsStatus}
                onChange={handleChangeStatus}
            />
            <div className="UpdateTaskForm__footer">
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmiting}
                >
                    Сохранить
                </Button>
                
                <Button
                    variant="contained"
                    onClick={onClose}
                    color="inherit"
                >
                    Отмена
                </Button>
            </div>
        </form>
    );
};

export default UpdateTaskForm;
