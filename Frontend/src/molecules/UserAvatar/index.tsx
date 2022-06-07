import React, { FC } from 'react';

import './index.css';

interface UserAvatarProps {
    picture?: string;
    width?: number;
    height?: number;
}

const UserAvatar: FC<UserAvatarProps> = ({ picture, width, height }) => {
    return <img className="UserAvatar" src={picture} width={width} height={height} />;
};

export default UserAvatar;
