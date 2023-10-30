import { AnyAction, Store, configureStore } from '@reduxjs/toolkit';

import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';

import authReducer from './slices/authSlice';
import acessibilityReducer from './slices/acessibilitySlice';
import commerceReducer from './slices/commerceSlice';
import commentReducer from './slices/commentSlice';
import myCommentSlice from './slices/myCommentSlice';
import myFavoriteSlice from './slices/myFavoriteSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        acessibility: acessibilityReducer,
        commerce: commerceReducer,
        comment: commentReducer,
        myComment: myCommentSlice,
        myFavorite: myFavoriteSlice,
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
