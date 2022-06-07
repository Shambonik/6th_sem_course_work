import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayout } from '../../organisms/DashboardLayout';
import { Page } from '../../organisms/Page';
import Profile from '../../organisms/Profile';
import { selectors, thunkCreators } from '../../store';

const ProfilePage: FC = () => {
    const { achievements } = useSelector(selectors.selectUser) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        if (!achievements?.length) {
            dispatch(thunkCreators.setUserAchivements());
        }
    }, []);

    return (
        <Page>
            <DashboardLayout>
                <Profile />
            </DashboardLayout>
        </Page>
    );
};

export default ProfilePage;
