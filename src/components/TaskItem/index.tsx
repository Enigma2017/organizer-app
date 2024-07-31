import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSelectedTask, removeSelectedTask } from '../../lib/redux/taskSlice';
import { Tag } from '../../types/types';

interface TaskItemProps {
    item: {
        title: string;
        deadline: string;
        tag: Tag;
        id: string;
    },
    tagList: Tag[],
    onClick: () => void;
}

export const TaskItem: FC<TaskItemProps> = ({ item, onClick }) => {
    const { title, deadline } = item;
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    const clickCheckboxItem = (id: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsChecked(!isChecked);
        if (isChecked) {
            dispatch(removeSelectedTask(id));
        } else {
            dispatch(addSelectedTask(id));
        }
    };

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('ru-RU', options).format(date);
    }

    return (
        <div className = {`task ${isChecked ? 'selected' : ''}`} onClick = { onClick }>
            <div onClick={(event) => clickCheckboxItem(item.id, event)} className='task-close'></div>
            <span className = 'title'>{title}</span>
            <div className = 'meta'>
                <span className = 'deadline'>{formatDate(deadline)}</span>
                <span className = 'tag' style = {{ color: item.tag.color, backgroundColor: item.tag.bg }}>
                    { item.tag.name }
                </span>
            </div>
        </div>
    );
};
