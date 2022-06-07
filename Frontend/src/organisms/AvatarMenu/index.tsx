import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PAGE_LOGOUT, PAGE_PROFILE } from '../../common/path';
import { selectors } from '../../store';

import './index.css';

interface AvatarMenuProps {
    children?: ReactNode;
    placement?: 'bottom-start' | 'bottom-end';
}

const AvatarMenu: FC<AvatarMenuProps> = ({ children, placement='bottom-start' }) => {
    const { project } = useSelector(selectors.selectUser) || {};
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <>
            <div ref={anchorRef} onClick={handleToggle}>
                {children}
            </div>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={placement}
                className="AvatarMenu__Popper"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom'
                        }}
                    >
                        <Paper className='AvatarMenu__Paper' style={{ width: anchorRef.current?.clientWidth }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {project && (
                                        <Link to={PAGE_PROFILE} className="ignoreLinkStyle">
                                            <MenuItem onClick={handleClose}>Профиль</MenuItem>
                                        </Link>
                                    )}
                                    <a href={PAGE_LOGOUT} className="ignoreLinkStyle">
                                        <MenuItem onClick={handleClose}>Выйти</MenuItem>
                                    </a>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default AvatarMenu;
