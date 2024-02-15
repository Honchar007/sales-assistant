import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// reducers
import authSlicer from './authSlicer';
import accountSlicer from './accountSlicer';

export const store = configureStore({
  reducer: {
    auth: authSlicer,
    accountInfo: accountSlicer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
