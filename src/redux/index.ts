import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// reducers
import authSlicer from './authSlicer';

export const store = configureStore({
  reducer: authSlicer,

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
