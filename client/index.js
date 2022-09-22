import React, { Component } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
