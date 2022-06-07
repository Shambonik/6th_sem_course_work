import React, { FC } from 'react';
import { parametrs } from '../../../common/path';
import { useQuery } from '../../../hooks/useQuery';
import CreateTaskForm from '../../../organisms/CreateTaskForm';
import { DashboardLayout } from '../../../organisms/DashboardLayout';
import { Page } from '../../../organisms/Page';

import './index.css';

const TaskCreatePage: FC = () => {
    const params = useQuery();
    const dashboardId = params.get(parametrs.DASHBOARD_ID);

    return (
        <Page>
            <DashboardLayout classNameMain='TaskCreatePage'>
                <CreateTaskForm dashboardId={Number(dashboardId)} />
            </DashboardLayout>
        </Page>
    );
};

export default TaskCreatePage;
