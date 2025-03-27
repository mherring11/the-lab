import { jsx as _jsx } from "react/jsx-runtime";
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Global styles, if any
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error("No root element found");
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
