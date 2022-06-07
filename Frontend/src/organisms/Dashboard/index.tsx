import React, { DragEventHandler, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardTask, CARD_TASK_CLASSNAME } from '../../molecules/CardTask';
import { ColumnTasks, COLUMN_TASKS_CLASSNAME } from '../../molecules/ColumnTasks';
import { CreateColumnTask } from '../../molecules/CreateColumnTask';
import { selectors, thunkCreators } from '../../store';

import './index.css';

interface DashboardProps {
    dashboardId: number;
}

interface DragData {
    element: HTMLDivElement;
    shiftX: number;
    shiftY: number;
}

const getDataTaskId = (element: HTMLDivElement) =>
    Number(element.getAttribute('data-taskid'));

export const Dashboard: FC<DashboardProps> = ({dashboardId}) => {
    const { tasks=[], statuses=[] } = useSelector(selectors.getCurrentBoard) || {};
    const [dragTaskData, setDragTaskData] = useState<DragData | undefined>();
    const dispatch = useDispatch();

    const dragTaskId = dragTaskData && getDataTaskId(dragTaskData.element);

    const onDragStart: DragEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        const { target } = e.nativeEvent;
        if (target instanceof HTMLElement) {
            const task = target.closest(`.${CARD_TASK_CLASSNAME}`);

            if (task instanceof HTMLDivElement) {
                const { left, top } = task.getBoundingClientRect();

                setDragTaskData({
                    element: task,
                    shiftX: e.clientX - left,
                    shiftY: e.clientY - top,
                });
            }
        }
    }, [setDragTaskData]);

    useEffect(() => {
        if (!dragTaskData) {
            return;
        }

        const onMouseMove = (e: DragEvent) => {
            e.preventDefault();
            dragTaskData.element.style.left = `${e.clientX - dragTaskData.shiftX}px`;
            dragTaskData.element.style.top = `${e.clientY - dragTaskData.shiftY}px`;
        };
    
        const onMouseUp = (e: DragEvent) => {
            e.preventDefault();

            if (e.target instanceof HTMLElement) {
                const column = e.target.closest(`.${COLUMN_TASKS_CLASSNAME}`);

                if (column) {
                    const statusId = Number(column.getAttribute('data-statusid'));

                    dispatch(thunkCreators.changeStatusTask({
                        taskId: getDataTaskId(dragTaskData.element),
                        statusId,
                    }));
                }
            }

            setDragTaskData(undefined);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            if (dragTaskData) {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };
    }, [dragTaskData, setDragTaskData]);

    
    return (
        <div
            className="Dashboard"
            onDragStart={onDragStart}
        >
            {statuses.sort((s1, s2) => s1.order - s2.order).map(status => (
                <div key={status.id} className="Dashboard__column">
                    <ColumnTasks statusId={status.id} title={status.name} dashboardId={dashboardId}>
                        {tasks
                            .filter(task => task.statusId === status.id)
                            .map(task => (
                            <CardTask 
                                key={task.id} 
                                taskId={task.id}
                                title={task.name}
                                isDrag={dragTaskId === task.id}
                            />
                        ))}
                    </ColumnTasks>
                </div>
            ))}
            <div className="Dashboard__column">
                <CreateColumnTask order={statuses.length} dashboardId={dashboardId} />
            </div>
        </div>
    );
};
