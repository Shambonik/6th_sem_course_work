import React, { FC, useEffect, useRef, useState } from 'react';

import './index.css';

interface ProgressLevelProps {
    pointsToLevelUp: number;
    points: number;
}

const ProgressLevel: FC<ProgressLevelProps> = ({ pointsToLevelUp, points }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const width = ref.current 
            ? ref.current?.clientWidth * points / pointsToLevelUp
            : 0;
        setWidth(width);
    }, []);

    return (
        <div className="ProgressLevel" ref={ref}>
            <div
                className="ProgressLevel__progress"
                style={{ width }}
            ></div>
            <div className="ProgressLevel__text">
                {points}/{pointsToLevelUp}
            </div>
        </div>
    );
};

export default ProgressLevel;
