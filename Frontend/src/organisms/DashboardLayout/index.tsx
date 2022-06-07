import React, { FC, ReactNode } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Skeleton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './index.css';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PAGE_DASHBOARD_CREATE, PAGE_PROJECT } from '../../common/path';
import { useSelector } from 'react-redux';
import { selectors } from '../../store';
import { UserRole } from '../../store/types/typeUser';

interface DashboardLayoutProps {
    classNameMain?: string;
    children?: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({children, classNameMain}) => {
    const { dashboardId } = useParams<{dashboardId: string}>();
    const { project, role } = useSelector(selectors.selectUser) || {};
    const boards = useSelector(selectors.selectPrimaryBoards);

    const isAdmin = role === UserRole.PROJECT_ADMIN;

    return (
        <div className="DashboardLayout">
            <div className="DashboardLayout__left">
                <Link to={PAGE_PROJECT} className="ignoreLinkStyle">
                    <Typography component="h3" variant="h6" noWrap>
                        {project?.name || <Skeleton variant="rectangular" width={210} height={32} />}
                    </Typography>
                </Link>

                <div>
                    <Typography component="h4" variant="h6" noWrap className="DashboardLeft__subtitleWrap">
                        <span className="DashboardLeft__subtitle">
                            Доски
                        </span>
                        {isAdmin && (
                            <Link to={PAGE_DASHBOARD_CREATE} className="ignoreLinkStyle">
                                <AddIcon fontSize="small" className="DashboardLeft__action" />
                            </Link>
                        )}
                    </Typography>

                    <List className="DashboardLeft__list">
                        {boards.map(({id, name}) => (
                            <Link to={`/dashboard/${id}`} className="DashboardLayout__link" key={id}>
                                <ListItem disablePadding className={classNames({
                                    DashboardLayout__licstItem_active: dashboardId === String(id),
                                })}>
                                    <ListItemButton>
                                        <ListItemText primary={name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </div>
            </div>
            <div className={classNames('DashboardLayout__main', classNameMain)}>
                {children}
            </div>
        </div>
    );
};
