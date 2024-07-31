import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types/types';

const initialState: TaskState = {
    tasks: [],
    selectedTasks: [],
    isOpenTaskForm: false,
    currentTask: null,
};
  
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addSelectedTask(state, action: PayloadAction<string>) {
            state.selectedTasks.push(action.payload);
        },
        removeSelectedTask(state, action: PayloadAction<string>) {
            state.selectedTasks = state.selectedTasks.filter((id) => id !== action.payload);
        },
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        openTaskForm(state) {
            state.isOpenTaskForm = true;
        },
        closeTaskForm(state) {
            state.isOpenTaskForm = false;
            state.currentTask = null;
        },
        setCurrentTask(state, action: PayloadAction<Task | null>) {
            state.currentTask = action.payload;
        },
    },
});
  
export const { setTasks, addTask, openTaskForm, closeTaskForm, setCurrentTask, addSelectedTask, removeSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
