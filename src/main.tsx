import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { RequestsProvider } from './contexts/RequestsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RequestsProvider>
          <App />
        </RequestsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);