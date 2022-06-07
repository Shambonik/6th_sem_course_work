import React, { FC, useCallback, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CreateDashboardSchema, validationSchema } from './schema';
import { useSnackbar } from 'notistack';

import './index.css';
import { api } from '../../api';
import { get } from 'lodash';
import { createPathToDashboard } from '../../common/path';
import { selectors } from '../../store';
import classNames from 'classnames';

interface CreateDashboardFormProps {
    className?: string;
}

const CreateDashboardForm: FC<CreateDashboardFormProps> = ({
    className,
}) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { project } = useSelector(selectors.selectUser) || {};

    const initialValues: CreateDashboardSchema = useMemo(() => ({
        name: '',
        description: '',
    }), []);

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const onSubmit = useCallback(async (values: CreateDashboardSchema) => {
        setIsSubmiting(true);

        if (!project?.id) {
            return;
        }

        try {
            const { boardId } = await api.createBoard({ 
                ...values,
                projectId: project.id,
            });
            history.push(createPathToDashboard(boardId));
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }

        setIsSubmiting(false);
    }, [dispatch, enqueueSnackbar, history, project?.id]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form className={classNames('CreateDashboardForm', className)} onSubmit={formik.handleSubmit}>
            <TextField
                label="Название"
                name="name"
                variant="outlined"
                className="CreateDashboardForm__marginBottom"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                label="Описание"
                name="description"
                variant="outlined"
                className="CreateDashboardForm__marginBottom"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                minRows={3}
                maxRows={Infinity}
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

export default CreateDashboardForm;
