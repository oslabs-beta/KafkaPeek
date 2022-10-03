import React, { Component } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './styles/application.scss';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
