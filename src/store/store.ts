import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './sliced/user/user.sliced'
import errorSlice from './sliced/error/error.sliced'
import successSlice from './sliced/success/success.slice'

export const store = configureStore({
  reducer: {
    user:userSlice,
    error:errorSlice,
    success:successSlice,
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
