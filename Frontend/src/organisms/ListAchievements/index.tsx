import { Skeleton, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { parametrs } from '../../common/path';
import { useQuery } from '../../hooks/useQuery';
import { selectors } from '../../store';
import { Achievement, UserRole } from '../../store/types/typeUser';
import AchievementModal from '../AchievementModal';

import './index.css';

interface ListAchievementsProps {
    achievements: Achievement[];
}

interface ItemListAchievementsProps {
    id: number;
    name: string;
    points: number;
    picture: string;
}

const ItemListAchievements: FC<ItemListAchievementsProps> = ({
    id,
    name,
    points,
    picture
}) => {
    const { pathname } = useLocation();

    return (
        <Link
            to={`${pathname}?${parametrs.ACHIEVEMENT_ID}=${id}`}
            className={classNames('ItemListAchievements', 'ignoreLinkStyle')}
        >
            {picture ? (
                <img className="ItemListAchievements__img" src={picture} alt={name} />
            ): (
                <Skeleton variant="circular" width={60} height={60} />
            )}
            <div className="ItemListAchievements__text">
                <span className="ItemListAchievements__name">
                    {name}
                </span>
                <Typography variant="overline" component="span" className="ItemListAchievements__points">
                    +{points}
                </Typography>
            </div>
        </Link>
    );
};

const ListAchievements: FC<ListAchievementsProps> = ({ achievements }) => {
    const params = useQuery();
    const achievementId: string | null = params.get(parametrs.ACHIEVEMENT_ID);
    const { role } = useSelector(selectors.selectUser);
    const isAdmin = role ===  UserRole.PROJECT_ADMIN;

    const achievementPopap: Achievement | undefined = achievementId && achievements.find(ach => ach.id === Number(achievementId));

    return (
        <>
            <div className="ListAchievements">
                {achievements.map(achievement => (
                    <ItemListAchievements key={achievement.id} {...achievement} />
                ))}
            </div>
            {achievementPopap && (
                <AchievementModal
                    isVisibleAssignAchivement={isAdmin}
                    isVisibleDepriveAchievement={isAdmin}
                    {...achievementPopap}
                />
            )}
        </>
    );
};

export default ListAchievements;
