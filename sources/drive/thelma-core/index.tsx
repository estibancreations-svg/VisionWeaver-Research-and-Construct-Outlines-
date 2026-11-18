Original name: index.tsx
Drive ID: 1wJMfD6Dt6Xrj6-9lqIsO3q3n-xey4w-H
Parent folder: thelma-core/
Modified: 2026-01-23T02:31:57.000Z

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