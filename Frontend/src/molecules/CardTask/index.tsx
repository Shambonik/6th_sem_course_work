import { Chip, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPathToTask } from '../../common/path';

import './index.css';

export interface CardTaskProps {
    taskId: number;
    title: string;
    tags?: string[];
    isDrag?: boolean;
}

export const CARD_TASK_CLASSNAME = 'CardTask';

interface Size {
    width: number;
    height: number;
}

export const CardTask: FC<CardTaskProps> = ({
    taskId,
    title,
    tags=[],
    isDrag=false,
}) => {
    const ref = useRef<HTMLDivElement>();
    const size = useRef<Size>();

    useEffect(() => {
        if (ref?.current) {
            size.current= {
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            };
        }
    }, [ref?.current]);

    return (
        <div
            ref={ref}
            className={classNames(CARD_TASK_CLASSNAME, {
                ['CardTask__isDrag']: isDrag,
            })}
            data-taskid={taskId}
            style={!(isDrag && size?.current) ? undefined : {
                width: size.current.width,
                height: size.current.height,
            }}
        >
            <Link
                className="ignoreLinkStyle"
                to={createPathToTask(taskId)}
            >
                <Typography>
                    {taskId}:{title}
                </Typography>
            </Link>
            {tags.map(textTag => (
                <Chip key={textTag} label={textTag} className="CardTask__Chip" />
            ))}
        </div>
    );
};
