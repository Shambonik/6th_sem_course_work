import React, { FC, ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import MuiModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Paper } from '@mui/material';

import './index.css';
import classNames from 'classnames';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({isOpen, children, className, onClose}) => {
    return (
            <MuiModal
                open={isOpen}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Paper className={classNames('Modal__Paper', className)}>
                        {children}
                    </Paper>
                </Fade>
            </MuiModal>
    );
};

export default Modal;
