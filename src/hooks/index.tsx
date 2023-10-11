import React from 'react';

import { Provider } from 'react-redux';

import store from './../store';

import { ToastProvider } from './toast';

export const AppProvider = ({ children }) => (
    <Provider store={store}>
        <ToastProvider>
            {children}
        </ToastProvider>
    </Provider>
);

