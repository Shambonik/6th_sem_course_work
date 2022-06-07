import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import { PAGE_DASHBOARD, PAGE_DASHBOARD_CREATE, PAGE_DASHBOARD_ID, PAGE_PROFILE, PAGE_PROJECT, PAGE_TASK, PAGE_TASK_CREATE } from './common/path';
import { DashboardPage } from './pages/_dashboard';
import { DashboardIdPage } from './pages/_dashboard/@id';
import DashboardCreatePage from './pages/_dashboard/_create';
import NotLinkProjectPage from './pages/_not-project';
import ProjectPage from './pages/_poject';
import ProfilePage from './pages/_profile';
import TaskIdPage from './pages/_task/@id';
import TaskCreatePage from './pages/_task/_create';
import { selectors, thunkCreators } from './store';

const App: React.FC = () => {
    const { project } = useSelector(selectors.selectUser) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkCreators.setMainUserInfo());
    }, []);

    if (!project) {
        return (
            <SnackbarProvider maxSnack={3}>
                <div className="App">
                    <NotLinkProjectPage />
                </div>
            </SnackbarProvider>
        );
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <div className="App">
                <Switch>
                    <Route path={PAGE_PROJECT}>
                        <ProjectPage />
                    </Route>

                    <Route path={PAGE_PROFILE}>
                        <ProfilePage />
                    </Route>

                    <Route path={PAGE_TASK_CREATE}>
                        <TaskCreatePage />
                    </Route>

                    <Route path={PAGE_TASK}>
                        <TaskIdPage />
                    </Route>

                    <Route path={PAGE_DASHBOARD_CREATE}>
                        <DashboardCreatePage />
                    </Route>

                    <Route path={PAGE_DASHBOARD_ID}>
                        <DashboardIdPage />
                    </Route>

                    <Route path={PAGE_DASHBOARD}>
                        <DashboardPage />
                    </Route>

                    <Redirect to={PAGE_PROJECT} />
                </Switch>
            </div>
        </SnackbarProvider>
    );
};

export default App;
