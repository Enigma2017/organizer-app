// Core
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const TAG_URL = process.env.REACT_APP_TAG_URL;

export { BASE_URL, AUTH_URL, TAG_URL };

import { UserRegisterInfo, AuthResponse, Credentials, Tag, Task, NewTask, ProfileInfo } from '../types/types';

export const api = Object.freeze({
    getVersion() {
        return '0.0.1';
    },
    get token(): string | null {
        return localStorage.getItem('token');
    },
    auth: {
        async signup(userInfo: UserRegisterInfo): Promise<AuthResponse> {
            const { data } = await axios.post<AuthResponse>(`${AUTH_URL}/registration`, userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('token', data.data);

            return data;
        },
        async login(credentials: Credentials): Promise<AuthResponse> {
            const encodedData = btoa(`${credentials.email}:${credentials.password}`);
            const { data } = await axios.get<AuthResponse>(`${AUTH_URL}/login`, {
                headers: {
                    authorization:  `Basic ${encodedData}`,
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('token', data.data);

            return data;
        },
        async profile(): Promise<ProfileInfo> {
            const { data } = await axios.get<ProfileInfo>(`${AUTH_URL}/profile`, {
                headers: {
                    authorization: `Bearer ${api.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return data;
        },
    },
    async tags(): Promise<Tag[]> {
        const { data } = await axios.get<Tag[]>(`${TAG_URL}`, {
            headers: {
                authorization: `Bearer ${api.token}`,
            },
        });
        return data;
    },
    task: {
        async create(task: NewTask): Promise<Task> {
            const { data } = await axios.post<Task>(`${BASE_URL}/tasks`, task, {
                headers: {
                    authorization: `Bearer ${api.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return data;
        },
        async edit(id: string, task: Task | NewTask): Promise<Task> {
            const { data } = await axios.put<Task>(`${BASE_URL}/tasks/${id}`, task, {
                headers: {
                    authorization: `Bearer ${api.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return data;
        },
        async delete(id: string): Promise<any> {
            try{
                const { data } = await axios.delete<any>(`${BASE_URL}/tasks/${id}`, {
                    headers: {
                        authorization: `Bearer ${api.token}`,
                        'Content-Type': 'application/json',
                    },
                });

                return data;
            }catch(error){
                return {};
            }
        },
        async fetch(): Promise<Task[]> {
            const { data } = await axios.get<any>(`${BASE_URL}/tasks`, {
                headers: {
                    authorization: `Bearer ${api.token}`,
                    'Content-Type': 'application/json',
                },
            });
            return data.data;
        },
    }

});
