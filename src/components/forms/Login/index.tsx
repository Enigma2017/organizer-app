import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../lib/redux/authSlice';
import { Credentials } from '../../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api/api';

export const Login: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        if (!email || !password) 
            return toast.error('Заполните все поля.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        const userData: Credentials = { email, password };

        try {  
            const { data } = await api.auth.login(userData);
            dispatch(setToken(data))
            toast.success('Добро пожаловать!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/task-manager');
            }, 3000);
    
        } catch (error) {
            console.log(error);
            toast.error('Произошла ошибка при входе.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <section className = 'sign-form'>
            <form onSubmit = { submitLogin }>
                <fieldset>
                    <legend>Вход</legend>
                    <label className = 'label'>
                        <input
                            lang = 'en'
                            placeholder = 'Электропочта'
                            type = 'text'
                            name = 'email' />
                    </label>
                    <label className = 'label'>
                        <input 
                            lang = 'en'
                            placeholder = 'Пароль'
                            type = 'password'
                            name = 'password' />
                    </label>
                    <input className = 'button-login' type = 'submit' value = 'Войти' />
                </fieldset>
                <p>Если у вас до сих пор нет учётной записи, вы можете 
                    <Link to = '/signup'> зарегистрироваться</Link>
                </p>
            </form>
            <ToastContainer />
        </section>
    );
}
