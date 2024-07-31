import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRegisterInfo } from '../../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api/api';

export const SignUp: FC = () => {
    const navigate = useNavigate();

    const submitRegistration = async (event: React.FormEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();
        if (!name || !email || !password || !confirmPassword) 
            return toast.error('Заполните все поля.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        if (password !== confirmPassword) return alert('Пароли не совпадают');

        const userData: UserRegisterInfo = { name, email, password };

        try {  
            const { data } = await api.auth.signup(userData);
            toast.success('Регистрация прошла успешно!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
    
        } catch (error) {
            toast.error('Произошла ошибка при регистрации.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    };
    return (
        <section className = 'publish-tip sign-form'>
            <form onSubmit = { submitRegistration }>
                <fieldset>
                    <legend>Регистрация</legend>
                    <label className = 'label'>
                        <input lang = 'en'
                            placeholder = 'Имя и фамилия'
                            type = 'text'
                            name = 'name' />
                    </label>
                    <label className = 'label'>
                        <input lang = 'en'
                            placeholder = 'Электропочта'
                            type = 'text'
                            name = 'email' />
                    </label>
                    <label className = 'label'>
                        <input lang = 'en'
                            placeholder = 'Пароль'
                            type = 'password'
                            name = 'password' />
                    </label>
                    <label className = 'label'>
                        <input lang = 'en'
                            placeholder = 'Подтверждение пароля'
                            type = 'password'
                            name = 'confirmPassword' />
                    </label>
                    <input className = 'button-login'
                        type = 'submit'
                        value = 'Зарегистрироваться' />
                </fieldset>
                <p>Перейти к <Link to = '/login'>логину</Link>.</p>
            </form>
            <ToastContainer />
        </section>
    );
}
