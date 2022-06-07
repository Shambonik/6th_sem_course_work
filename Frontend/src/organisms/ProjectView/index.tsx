import { Button, TextField, Typography } from '@mui/material';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../api';
import { useBoolean } from '../../hooks/useBoolean';
import { selectors } from '../../store';
import { Project } from '../../store/types/typeProject';
import ListAchievements from '../ListAchievements';
import AddIcon from '@mui/icons-material/Add';

import './index.css';
import CreateAchievementModal from '../CreateAchievementModal';
import { useQuery } from '../../hooks/useQuery';
import { parametrs, PATH_CREATE_ACHIEVEMENT_TO_PROJECT } from '../../common/path';
import { useHistory } from 'react-router-dom';

const ProjectView: FC = () => {
    const project: Project | undefined = useSelector(selectors.getCurrentProject);
    const [isActive, enable, disable] = useBoolean(false);
    const [email, setEmail] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();
    const params = useQuery();
    const history = useHistory();

    const isOpenAchievementCreate = Boolean(params.get(parametrs.ACHIEVEMENT_CREATE));

    const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
        ({ target }) => {
            setEmail(target.value);
            if (target.value) {
                enable();
            } else {
                disable();
            }
        },
        [],
    );

    const handleAdd = useCallback(async () => {
        try { 
            disable();
            await api.accessToProject({
                data: {
                    projectId: project.id,
                    email,
                }
            });
            enqueueSnackbar(`Пользователь ${email} добавлен`, {
                variant: 'info',
            });
            setEmail('');
        } catch (error) {
            const errorMessage = (get(error, 'message') as string | undefined) || 'Неизвестная ошибка';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
        }
        enable();
    }, [email, project?.id, disable, enable, setEmail]);

    const openAchievementCreate = useCallback(() => {
        history.replace(PATH_CREATE_ACHIEVEMENT_TO_PROJECT);
    }, [history]);

    if (!project) {
        return null;
    }

    const {
        name,
        description,
        achievements
    } = project;

    return (
        <>
            {isOpenAchievementCreate && <CreateAchievementModal />}
            <div className="ProjectView">
                <div className="ProjectView__info">
                    <Typography variant="h5" gutterBottom component="h5">
                        {name}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="p">
                        {description}
                    </Typography>
                </div>
                <div className="ProjectView__members">
                    <Typography variant="h6" gutterBottom component="h6">
                        Пользователи
                    </Typography>
                    <div className='ProjectView__addUser'>
                        <TextField 
                            value={email}
                            onChange={handleChangeEmail}
                            placeholder="Email нового пользователя"
                            variant="outlined"
                            type="email"
                            size="small"
                            className="ProjectView__emailInput"
                        />
                        <Button
                            disabled={!isActive}
                            variant="contained"
                            onClick={handleAdd}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="ProjectView__achivementHeader">
                        <Typography variant="h6" gutterBottom component="h6">
                            Достижения
                        </Typography>
                        <Button onClick={openAchievementCreate} color="inherit">
                            <AddIcon />
                        </Button>
                    </div>
                    <ListAchievements achievements={achievements} />
                </div>
            </div>
        </>
    );
};

export default ProjectView;
