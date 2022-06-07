import { Avatar, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AvatarMenu from '../AvatarMenu';

import './index.css';

interface HeaderProps {
    title?: string;
    usesrname?: string;
    avatarSrc?: string;
}

export const Header: FC<HeaderProps> = ({title, usesrname, avatarSrc}) => {
    return (
        <header className='Header'>
            <Link to="/" className="ignoreLinkStyle">
                <Typography
                    variant="h4"
                    component="h1"
                    className="Header__title"
                >
                    {title || 'Yprod'}
                </Typography>
            </Link>

            <AvatarMenu placement="bottom-end">
                <div className="Header__avatarWrap">
                    {usesrname && (
                        <span className="Header__usesrname">
                            {usesrname}
                        </span>
                    )}
                    <Avatar
                        alt={usesrname}
                        src={avatarSrc}
                    />
                </div>
            </AvatarMenu>
        </header>
    );
};
