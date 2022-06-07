import { Avatar, Button, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Status } from '../../store/types/typeDashboard';
import { CurrentTask } from '../../store/types/typeTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { createPathToDashboard } from '../../common/path';

import './index.css';
import UpdateTaskForm from '../UpdateTaskForm';
import { useBoolean } from '../../hooks/useBoolean';

interface TaskProps {
    currentTask: CurrentTask;
    taskStatuses: Status[];
}

const Task: FC<TaskProps> = ({ currentTask, taskStatuses }) => {
    const { 
        id: taskId,
        name,
        description,
        storyPoints,
        status,
        boardId,
        executor: { name: username, picture }
    } = currentTask;

    const initialValues = {
        name,
        description,
        storyPoints,
        statusId: taskStatuses.find(({ name }) => name === status)?.id,
    };

    const [isUpdateMode, openUpdateMode, closeUpdateMode] = useBoolean(false);

    return (
        <div className="Task">
            {isUpdateMode ? (
                <UpdateTaskForm
                    taskId={taskId}
                    taskStatuses={taskStatuses}
                    initialValues={initialValues}
                    onSubmit={closeUpdateMode}
                    onClose={closeUpdateMode}
                />
            ) : (
                <>
                    <div className="Task__header">
                        <Link to={createPathToDashboard(boardId)} className="Task__back">
                            <ArrowBackIcon /> Назад на дашборд 
                        </Link>
                        <Button onClick={openUpdateMode} color="inherit">
                            <EditIcon />
                        </Button>
                    </div>
                    <Typography variant="h5" gutterBottom component="h3">
                        {name}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="h3">
                        {description}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                        Story points: {storyPoints} sp
                    </Typography>
                    <div>
                        Статус:
                        <Typography variant="overline" component="span" gutterBottom className="Task__left">
                            {status}
                        </Typography>
                    </div>
                    <div className="Task__executor">
                        Исполнитель:
                        <Avatar src={picture}  className="Task__left"/>
                        <Typography variant="body1" className="Task__left" component="span">
                            {username}
                        </Typography>
                    </div>
                </>
            )}
        </div>
    );
};

export default Task;
