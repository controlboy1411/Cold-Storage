import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AppProvider } from './context/AppContext.jsx';
import './i18n/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
    </React.StrictMode>
);