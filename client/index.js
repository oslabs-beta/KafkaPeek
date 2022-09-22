import React, { Component } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './styles/application.scss';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
