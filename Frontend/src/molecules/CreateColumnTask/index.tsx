import React, { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import './index.css';
import { useBoolean } from '../../hooks/useBoolean';
import { api } from '../../api';
import { useSnackbar } from 'notistack';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import actionsCreators from '../../store/actions-creators';

interface CreateColumnTaskProps {
    dashboardId: number;
    order: number;
}

export const CreateColumnTask: FC<CreateColumnTaskProps> = ({ dashboardId, order }) => {
    const [isActiveForm, openForm, closeForm] = useBoolean();
    const [newTitleColumn, setNewTitleColumn] = useState<string | undefined>();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target }) => setNewTitleColumn(target.value), 
        []
    );

    const handleAdd = useCallback(async () => {
        try {
            const { id, value } = await api.addStatus({
                boardId:dashboardId, 
                data: {
                    value: newTitleColumn,
                    order,
                },
            });
            dispatch(actionsCreators.addStatus({
                id,
                name: value,
                order,
            }));
            closeForm();
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
    }, [dashboardId, newTitleColumn, order]);

    if (isActiveForm) {
        return (
            <div className="CreateColumnTask">
                <TextField 
                    value={newTitleColumn}
                    onChange={handleChange}
                    placeholder="Ввести заголовок списка"
                    variant="outlined"
                    size="small"
                    className="CreateColumnTask__Input"
                />
                <div>
                    <Button variant="contained" onClick={handleAdd}>Добавить</Button>
                    <Button 
                        color="inherit" 
                        onClick={closeForm}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Button className="CreateColumnTaskButton" variant="contained" onClick={openForm}>
            <AddIcon fontSize="small" className="CreateColumnTask__AddIcon" />
            Добавить ещё одну колонку
        </Button>
    );
};
