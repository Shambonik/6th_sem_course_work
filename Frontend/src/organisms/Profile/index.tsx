import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressLevel from '../../molecules/ProgressLevel';
import UserAvatar from '../../molecules/UserAvatar';
import { selectors } from '../../store';
import { User } from '../../store/types/typeUser';
import ListAchievements from '../ListAchievements';

import './index.css';

const Profile = () => {
    const user: User | undefined = useSelector(selectors.selectUser);

    if (!user) {
        return null;
    }

    const {
        picture,
        name,
        email,
        points,
        pointsToLevelUp,
        level,
        achievements=[],
    } = user;

    return (
        <div className="Profile">
            <div className="Profile__userinfo">
                <div className="Profile__userinfoLeft">
                    <UserAvatar picture={picture} />
                    <ProgressLevel points={points} pointsToLevelUp={pointsToLevelUp} />
                </div>
                <div className="Profile__userinfoRight">
                    <Typography variant="body1" gutterBottom component="div">
                        Публичное имя: {name}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                        Email: {email}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="div">
                        Уровень: {level}
                    </Typography>
                </div>
            </div>
            <Typography variant="h5" gutterBottom component="h5">
                Достижения
            </Typography>
            <ListAchievements achievements={achievements} />
        </div>
    );
};

export default Profile;
