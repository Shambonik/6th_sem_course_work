import { Button, TextField, Typography } from '@mui/material';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { api } from '../../api';
import { useBoolean } from '../../hooks/useBoolean';
import Modal from '../../molecules/Modal';
import actionsCreators from '../../store/actions-creators';

import './index.css';

interface AchievementModalProps {
    id: number;
    name: string;
    description: string;
    points: number;
    picture: string;
    isVisibleAssignAchivement?: boolean;
    isVisibleDepriveAchievement?: boolean;
}

const AchievementModal: FC<AchievementModalProps> = ({
    id: achievementId,
    name,
    description,
    points,
    picture,
    isVisibleAssignAchivement=true,
    isVisibleDepriveAchievement=true,
}) => {
    const history = useHistory();
    const location = useLocation();
    const [isActiveAssign, enableAssign, disableAssign] = useBoolean(false);
    const [emailAssign, setEmailAssign] = useState<string>('');
    const [isActiveDepive, enableDepive, disableDepive] = useBoolean(false);
    const [emailDepive, setEmailDepive] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleChangeEmailAssign: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target }) => {
            setEmailAssign(target.value);
            if (target.value) {
                enableAssign();
            } else {
                disableAssign();
            }
        },
        [],
    );

    const handleChangeEmailDeprive: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target }) => {
            setEmailDepive(target.value);
            if (target.value) {
                enableDepive();
            } else {
                disableDepive();
            }
        },
        [],
    );

    const handleClose = () => {
        history.replace(location.pathname);
    };
    
    const handleAssign = useCallback(async () => {
        try { 
            disableAssign();
            await api.assignAchivement({
                achievementId,
                data: {
                    email: emailAssign,
                }
            });
            enqueueSnackbar(`Пользователю ${emailAssign} выдана ачивка ${name}`, {
                variant: 'info',
            });
            setEmailAssign('');
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
        enableAssign();
    }, [emailAssign, name, achievementId, disableAssign, enableAssign, setEmailAssign]);

    const handleDeprive = useCallback(async () => {
        disableDepive();
        try {
            await api.depriveAchivement({
                achievementId,
                data: {
                    email: emailDepive,
                }
            });
            dispatch(actionsCreators.depriveAchivement(achievementId));
            enqueueSnackbar(`У пользователя ${emailDepive} отобрана ачивка ${name}`, {
                variant: 'info',
            });
            setEmailDepive('');
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
        enableDepive();
    }, [emailDepive, name, achievementId, dispatch, disableDepive, enableDepive, setEmailDepive]);

    return (
        <Modal isOpen onClose={handleClose} className="AchievementModal">
            <p className="AchievementModal__block">
                <img src={picture} className="AchievementModal__img" alt={name} />
                <Typography variant="h6" component="h6" className="AchievementModal__name" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="overline" component="p" gutterBottom>
                    Опыт: {points}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    {description}
                </Typography>
            </p>
            {isVisibleAssignAchivement && (
                <div className="AchievementModal__block">
                    <TextField
                        value={emailAssign}
                        onChange={handleChangeEmailAssign}
                        placeholder="Email пользователя"
                        variant="outlined"
                        type="email"
                        size="small"
                        className="AchievementModal__emailInput"
                    />
                    <Button
                        disabled={!isActiveAssign || emailAssign.length === 0}
                        variant="contained"
                        onClick={handleAssign}
                    >
                        Выдать
                    </Button>
                </div>
            )}
            {isVisibleDepriveAchievement && (
                <div className="AchievementModal__block">
                    <TextField
                        value={emailDepive}
                        onChange={handleChangeEmailDeprive}
                        placeholder="Email пользователя"
                        variant="outlined"
                        type="email"
                        size="small"
                        className="AchievementModal__emailInput"
                    />
                    <Button
                        disabled={!isActiveDepive || emailDepive.length === 0}
                        color="error"
                        variant="contained"
                        onClick={handleDeprive}
                    >
                        Отобрать
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default AchievementModal;
