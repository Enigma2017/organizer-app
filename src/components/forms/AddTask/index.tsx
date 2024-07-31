// src/components/forms/AddTask.tsx
import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TagItem } from '../../TagItem';
import { RootState } from '../../../lib/redux/store';
import { Tag, NewTask } from '../../../types/types';
import { api } from '../../../api/api';

interface AddTaskProps {
    addTask: (newTask: NewTask) => void;
    closeForm: () => void;
}

export const AddTask: FC<AddTaskProps> = ({ addTask, closeForm }) => {
    const dispatch = useDispatch();
    const currentTask = useSelector((state: RootState) => state.tasks.currentTask);
    const [startDate, setStartDate] = useState<Date>(currentTask ? new Date(currentTask.deadline) : new Date());
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [title, setTitle] = useState(currentTask?.title || '');
    const [description, setDescription] = useState(currentTask?.description || '');
    const [tag, setTag] = useState(currentTask?.tag || '');

    useEffect(() => {
        api.tags().then(data => setTagList(data));
    }, []);

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description || '');
            setStartDate(new Date(currentTask.deadline));
            setTag(currentTask.tag);
        }
    }, [currentTask]);

    const submitTask = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !description || !startDate || !tag)
            return toast.error('Заполните все поля.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        const newTask: NewTask = { title, description, deadline: startDate.toISOString(), tag, completed: false };
        addTask(newTask);
        toast.success(currentTask ? 'Задача обновлена!' : 'Задача добавлена!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        closeForm();
    };

    return (
        <div className = 'task-card'>
            <form onSubmit = { submitTask }>
                <div className = 'head'></div>
                <div className = 'content'>
                    <label className = 'label'>Задача
                        <input
                            className = 'title'
                            lang = 'en'
                            placeholder = 'Название задачи'
                            type = 'text'
                            name = 'title'
                            value = { title }
                            onChange = { (e) => setTitle(e.target.value) }
                        />
                    </label>
                    <div className = 'deadline'>
                        <span className = 'label'>Дедлайн</span>
                        <span className = 'date'>
                            <div className = 'react-datepicker-wrapper'>
                                <DatePicker
                                    selected = { startDate }
                                    onChange = { (date: Date) => setStartDate(date) }
                                    dateFormat = 'dd MMM yyyy'
                                    className = 'react-datepicker'
                                    name = 'deadline'
                                />
                            </div>
                        </span>
                    </div>
                    <div className = 'description'>
                        <label className = 'label'>Описание
                            <textarea
                                className = 'text'
                                lang = 'en'
                                placeholder = 'Описание задачи'
                                name = 'description'
                                value = { description }
                                onChange = { (e) => setDescription(e.target.value) }
                            />
                        </label>
                    </div>
                    <div className = 'tags'>
                        { tagList.map(t => (
                            <TagItem
                                onClick = { () => setTag(t.id) }
                                key = { t.id }
                                tag = { t }
                                selected = { t.id === tag }
                            />
                        )) }
                    </div>
                    <div className = 'errors'></div>
                    <div className = 'form-controls'>
                        <button type = 'reset' className = 'button-reset-task'>
                            Сбросить
                        </button>
                        <button type = 'submit' className = 'button-save-task'>
                            { currentTask ? 'Обновить' : 'Сохранить' }
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
