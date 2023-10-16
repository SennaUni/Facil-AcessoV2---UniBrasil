import { AnyAction, Store, configureStore } from '@reduxjs/toolkit';

import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';

import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: [thunk as ThunkMiddleware],
});

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
    dispatch: AppThunkDispatch;
}
