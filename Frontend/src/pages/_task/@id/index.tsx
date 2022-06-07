import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../../../organisms/DashboardLayout';
import { Page } from '../../../organisms/Page';
import Task from '../../../organisms/Task';
import { selectors, thunkCreators } from '../../../store';

const TaskIdPage: FC = () => {
    const {taskId} = useParams<{taskId: string}>();
    const currentTask = useSelector(selectors.getCurrentTask);
    const taskStatuses = useSelector(selectors.getTaskStatuses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkCreators.setCurrentTask(Number(taskId)));
    }, []);

    return (
        <Page>
            <DashboardLayout>
                {currentTask && <Task currentTask={currentTask} taskStatuses={taskStatuses} />}
            </DashboardLayout>
        </Page>
    );
};

export default TaskIdPage;
