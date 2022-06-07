import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../api';
import { PAGE_PROJECT } from '../../common/path';
import DragAndDropImage from '../../molecules/DragAndDropImage';
import Modal from '../../molecules/Modal';
import actionsCreators from '../../store/actions-creators';

import './index.css';
import { CreateAchievementSchema, validationSchema } from './schema';

const CreateAchievementModal: FC = () => {
    const history = useHistory();    
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const initialValues: CreateAchievementSchema = useMemo(() => ({
        name: '',
        description: '',
        points: 0,
        picture: '',
    }), []);
    
    const handleClose = () => {
        history.replace(PAGE_PROJECT);
    };

    const onSubmit = useCallback(async (values: CreateAchievementSchema) => {
        setIsSubmiting(true);

        try {
            const achievement = await api.createAchivement({ data: values });
            dispatch(actionsCreators.addAchievementToProject(achievement));
            history.replace(PAGE_PROJECT);
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

    const handleChangePicture = useCallback(async (imageSrc: string) => {
        await formik.setFieldValue('picture', imageSrc);
    }, [formik.setFieldValue]);

    return (
        <Modal isOpen onClose={handleClose} className="CreateAchievementModal">
            <form className="CreateAchievementModal" onSubmit={formik.handleSubmit}>
                <TextField
                    label="Название"
                    name="name"
                    variant="outlined"
                    className="CreateAchievementModal__marginBottom"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label="Описание"
                    name="description"
                    variant="outlined"
                    className="CreateAchievementModal__marginBottom"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    multiline
                    minRows={3}
                    maxRows={Infinity}
                />
                <TextField
                    label="Очки опыта"
                    name="points"
                    type="number"
                    variant="outlined"
                    className="CreateAchievementModal__marginBottom"
                    value={formik.values.points}
                    onChange={formik.handleChange}
                    error={formik.touched.points && Boolean(formik.errors.points)}
                    helperText={formik.touched.points && formik.errors.points}
                />
                <DragAndDropImage
                    name="picture"
                    className="CreateAchievementModal__marginBottom"
                    onChange={handleChangePicture}
                />
                {formik.touched.picture && Boolean(formik.errors.picture) && (
                    <Typography
                        className="CreateAchievementModal__marginBottom CreateAchievementModal__error"
                        variant="caption"
                        component="div"
                    >
                        {formik.touched.points && formik.errors.points}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmiting}
                >
                    Создать
                </Button>
            </form>
        </Modal>
    );
};

export default CreateAchievementModal;
