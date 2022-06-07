import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import './index.css';
import { Button, Typography } from '@mui/material';
import { createPathToCreateTask } from '../../common/path';

interface ColumnTasksProps {
    dashboardId: number;
    statusId: number;
    title: string;
    children?: ReactNode;
}

export const COLUMN_TASKS_CLASSNAME = 'ColumnTasks';

export const ColumnTasks: FC<ColumnTasksProps> = ({statusId, dashboardId, title, children}) => {
    return (
        <div className={COLUMN_TASKS_CLASSNAME} data-statusid={statusId}>
            <Typography variant="h6" component="h3">
                {title}
            </Typography>
            <div className="ColumnTasks__list">
                {children}
            </div>
            <Link 
                to={createPathToCreateTask(dashboardId)}
                className="ColumnTasks__link"
            >
                <Button size="small" color="inherit" className="ColumnTasks__linkButton">
                    <AddIcon fontSize="small" className="ColumnTasks__AddIcon" />
                    Создать задачу
                </Button>
            </Link>
        </div>
    );
};
