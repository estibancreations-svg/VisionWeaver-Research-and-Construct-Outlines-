Original name: index.tsx
Drive ID: 1j03o3MexK6w89s9Sld770u0QMCLBKuZa
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/
Modified: 2026-01-31T10:56:50.000Z

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);