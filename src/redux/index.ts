import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// reducers
import authSlicer from './authSlicer';
import sidebarSlicer from './sidebarSlicer';

// api
import { setupListeners } from '@reduxjs/toolkit/query';
import { MainApi } from './rtk/main.api';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    sidebar: sidebarSlicer,
    [MainApi.reducerPath]: MainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MainApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


setupListeners(store.dispatch);
