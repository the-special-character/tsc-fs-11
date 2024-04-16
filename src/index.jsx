import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';

document.body.innerHTML = '<main id="app"></main>';

const root = createRoot(document.getElementById('app'));
root.render(<App />);
