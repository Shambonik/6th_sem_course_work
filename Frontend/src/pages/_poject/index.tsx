import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayout } from '../../organisms/DashboardLayout';
import { Page } from '../../organisms/Page';
import ProjectView from '../../organisms/ProjectView';
import { selectors, thunkCreators } from '../../store';
import { Project } from '../../store/types/typeProject';

const ProjectPage: FC = () => {
    const project: Project | undefined = useSelector(selectors.getCurrentProject);
    const { project: userProject } = useSelector(selectors.selectUser) || {};

    const dispatch = useDispatch();

    useEffect(() => {
        if (!project && userProject?.id) {
            dispatch(thunkCreators.setCurrentProject(userProject.id));
        }
    }, [userProject?.id, project]);

    return (
        <Page>
            <DashboardLayout>
                <ProjectView />
            </DashboardLayout>
        </Page>
    );
};

export default ProjectPage;
