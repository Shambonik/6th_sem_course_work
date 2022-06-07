import React, { FC } from 'react';
import CreateDashboardForm from '../../../organisms/CreateDashboardForm';
import { DashboardLayout } from '../../../organisms/DashboardLayout';
import { Page } from '../../../organisms/Page';

import './index.css';

const DashboardCreatePage: FC = () => {
    return (
        <Page>
            <DashboardLayout>
                <CreateDashboardForm className="DashboardCreatePage" />
            </DashboardLayout>
        </Page>
    );
};

export default DashboardCreatePage;
