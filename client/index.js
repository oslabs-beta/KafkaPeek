import React from 'react';
import { createRoot } from 'react-dom/client';

import { HashRouter } from 'react-router-dom';

import App from './App';
import './styles/application.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
