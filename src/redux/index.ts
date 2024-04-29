import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// reducers
import authSlicer from './authSlicer';
import sidebarSlicer from './sidebarSlicer';

// api
import { setupListeners } from '@reduxjs/toolkit/query';
import { ChatApi } from './rtk/chat.api';
import { ChatHistoryApi } from './rtk/chatHistory.api';
import { FeedsApi } from './rtk/feeds.api';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    sidebar: sidebarSlicer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [ChatHistoryApi.reducerPath]: ChatHistoryApi.reducer,
    [FeedsApi.reducerPath]: FeedsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ChatApi.middleware,
      ChatHistoryApi.middleware,
      FeedsApi.middleware),
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
