import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';

 
export const Navigation: FC = () => {
    const [activeLink, setActiveLink] = useState('');
    const token = useSelector((state: RootState) => state.token.token);

    const changePage = () => {
        setTimeout(() => setActiveLink(window.location.pathname), 200);
    }

    const resetToken = () => {
        changePage();
        localStorage.removeItem('token');
        location.reload();
    }

    const isActive = (link: string) => {
        return activeLink === link ? 'active' : '';
    }

    return (
        <nav>
            <ul>
                { token ?
                    (<li><Link onClick = { resetToken } to = '/login'>Выйти</Link></li>)
                    : (<li><Link onClick = { changePage } to = '/login'>Войти</Link></li>) }
                { token && <li><Link onClick = { () => changePage() } to = '/task-manager' className = { isActive('/task-manager') }>К задачам</Link></li> }
                { token && <li><Link onClick = { () => changePage() } to = '/profile' className = { isActive('/profile') }>Профиль</Link></li> }
            </ul>
        </nav>
    );
}
