import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { Page } from '../../organisms/Page';

import './index.css';

const NotLinkProjectPage: FC = () => {
    return (
        <Page>
            <div className="NotLinkProjectPage">
                <Typography variant="h5" component="h3">
                    Попросите администратора прикрепить вас к проекту
                </Typography>
            </div>
        </Page>
    );
};

export default NotLinkProjectPage;
