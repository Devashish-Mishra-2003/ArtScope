import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './styles/theme.css';
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

