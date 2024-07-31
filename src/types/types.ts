export interface UserRegisterInfo {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    data: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ProfileInfo {
    name: string;
    email: string;
}

export interface Tag {
    id: string;
    name: string;
    color: string;
    bg: string;
}

export interface Task {
    completed?: boolean;
    title: string;
    description?: string;
    deadline: string;
    tag: Tag;
    id: string;
}

export interface NewTask {
    completed?: boolean;
    title: string;
    description?: string;
    deadline: string;
    tag: Tag | string;
}

export interface TaskState {
    tasks: Task[];
    selectedTasks: string[];
    isOpenTaskForm: boolean;
    currentTask: Task | null;
}
