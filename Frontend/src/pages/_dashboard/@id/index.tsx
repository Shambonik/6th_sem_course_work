import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dashboard } from '../../../organisms/Dashboard';
import { DashboardLayout } from '../../../organisms/DashboardLayout';
import { Page } from '../../../organisms/Page';
import { thunkCreators } from '../../../store';

import './index.css';

export const DashboardIdPage = () => {
    const {dashboardId} = useParams<{dashboardId: string}>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkCreators.setBoard(Number(dashboardId)));
    }, []);

    return (
        <Page>
            <DashboardLayout classNameMain="DashboardIdPage__main">
                {dashboardId 
                    ? <Dashboard dashboardId={Number(dashboardId)}/>
                    : 'Доска не найдена'
                }
            </DashboardLayout>
        </Page>
    );
};
