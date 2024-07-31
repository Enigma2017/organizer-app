import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardButton } from '../DashboardButton';
import { AddTask } from '../forms/AddTask';
import { TaskManagerList } from '../TaskManagerList';
import { Task, NewTask } from '../../types/types';
import { RootState } from '../../lib/redux/store';
import { setTasks, openTaskForm, closeTaskForm, setCurrentTask } from '../../lib/redux/taskSlice';
import { api } from '../../api/api';

export const TaskManagerBoard: FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const isOpenTaskForm = useSelector((state: RootState) => state.tasks.isOpenTaskForm);
    const currentTask = useSelector((state: RootState) => state.tasks.currentTask);
    const selectedTasks = useSelector((state: RootState) => state.tasks.selectedTasks);

    const fetchTasks = () => {
        api.task.fetch().then((data) => {
            dispatch(setTasks(data));
        });
    };

    useEffect(() => {
        fetchTasks();
    }, [dispatch]);

    const handleAddTask = (newTask: NewTask | Task) => {
        if (typeof newTask.tag === 'object' && newTask.tag !== null) {
            newTask.tag = newTask.tag.id;
        } else {
            (typeof newTask.tag === 'string');
        }

        if (currentTask) {
            api.task.edit(currentTask.id, newTask).then((updatedTask) => {
                fetchTasks();
                dispatch(setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))));
            });
        } else {
            api.task.create({ ...newTask, completed: false }).then((createdTask) => {
                fetchTasks();
            });
        }
    };

    const removeSelectedTasks = () => {
        selectedTasks.forEach((id) => {
            api.task.delete(id);
        })
        setTimeout(() => fetchTasks(), 500);
    };

    const listClassName = tasks.length === 0 ? 'list empty' : 'list';

    const handleOpenTaskForm = () => {
        dispatch(openTaskForm());
        dispatch(setCurrentTask(null));
    };

    const handleCloseTaskForm = () => {
        dispatch(closeTaskForm());
    };

    const handleEditTask = (task: Task) => {
        dispatch(openTaskForm());
        dispatch(setCurrentTask(task));
    };

    const handleResetTask = () => {
        dispatch(setCurrentTask(null));
    };

    return (
        <>
            <DashboardButton onClick = { handleOpenTaskForm } />
            <div className = 'wrap'>
                <div className = { listClassName }>
                    <TaskManagerList removeSelectedTasks = { removeSelectedTasks } tasks = { tasks } editTask = { handleEditTask } />
                </div>
                { isOpenTaskForm && <AddTask addTask = { handleAddTask } closeForm = { handleCloseTaskForm } />}
            </div>
        </>
    );
};
