import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/index';
import { HelmetProvider } from 'react-helmet-async';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <HelmetProvider>
            <Routes>
              <Route path='/*' element={<App />}/>
            </Routes>
          </HelmetProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
);
