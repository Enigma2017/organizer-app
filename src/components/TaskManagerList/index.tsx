import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { TaskItem } from '../TaskItem';
import { api } from '../../api/api';
import { Tag, Task } from '../../types/types';

const tasks: Task[] = [];

interface TaskManagerListProps {
    tasks: Task[],
    editTask: (task: Task) => void,
    removeSelectedTasks: () => void
}

export const TaskManagerList: FC<TaskManagerListProps> = ({ tasks, editTask, removeSelectedTasks }) => {
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [tag, setTag] = useState('');
    const selectedTasks = useSelector((state: RootState) => state.tasks.selectedTasks);
    useEffect(() => {
        api.tags().then(data => setTagList(data));
    }, []);

    return (
        <div className = 'tasks'>
            <button onClick = { () => removeSelectedTasks() }>
                { selectedTasks.length > 0 && <i className='la la-close'>Delete task</i> }
            </button>
            { tasks.map((task) => (
                <TaskItem key = { task.id } item = { task } onClick = { () => editTask(task) } tagList = {tagList} />
            )) }
        </div>
    );
};
