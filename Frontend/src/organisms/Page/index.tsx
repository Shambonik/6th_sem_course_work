import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../store';
import { Header } from '../Header';

import './index.css';

interface PageProps {
    children?: ReactNode;
}

export const Page: FC<PageProps> = ({children}) => {
    const { name, picture } = useSelector(selectors.selectUser) || {};

    return (
        <div className="Page">
            <Header avatarSrc={picture} usesrname={name} />
            <main className="Page__main">
                {children}
            </main>
        </div>
    );
};
