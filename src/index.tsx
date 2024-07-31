// Core
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';

// Components
import { App } from './app';

import './theme/styles/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
if(!container) {
    throw new Error("Не найден элемент с id 'root'");
}
const root = createRoot(container);

root.render(
    <Provider store = { store }>
        <Router>
            <App />
        </Router>
    </Provider>,
);
