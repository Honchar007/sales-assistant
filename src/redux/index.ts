import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// reducers
import authSlicer from './authSlicer';
import sidebarSlicer from './sidebarSlicer';
import tableSlicer from './tableSlicer';

// api
import { setupListeners } from '@reduxjs/toolkit/query';
import { feedsApi } from './rtk/feeds.api';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    sidebar: sidebarSlicer,
    [feedsApi.reducerPath]: feedsApi.reducer,
    table: tableSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedsApi.middleware),
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
