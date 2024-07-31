// Core
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './lib/redux/authSlice';

// Components
import { Navigation } from './components/Navigation';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { TaskManagerPage } from './pages/TaskManager';
import { ProfilePage } from './pages/Profile';
import { LoginPage } from './pages/Login';
import { SignUpPage } from './pages/SignUp';
import { Footer } from './components/Footer';

export const App: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
        } else {
            navigate('/login');
        }
    }, [])
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                <Routes>
                    <Route path = '/' element = {<HomePage />} />
                    <Route path = '/login' element = {<LoginPage />} />
                    <Route path = '/signup' element = {<SignUpPage />} />
                    <Route path = '/task-manager' element = {<TaskManagerPage />} />
                    <Route path = '/profile' element = {<ProfilePage />} />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
