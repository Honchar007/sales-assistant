import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// api
import AuthApi from '../api/auth.api';

// models
import MainState from '../interfaces/main-state';
import IAccountState from '../interfaces/account-state';
import { ILoginRequestDTO } from '../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';

// enums
import { AccountStatus } from '../submodules/public-common/enums/account/account-status.enum';
import { AccountTypeAuth } from '../submodules/public-common/enums/account/account-type-auth.enum';
import { AccountRole } from '../submodules/public-common/enums/account/account-role.enum';

// services
import localStorageService from '../services/local-storage.service';

const initialState: IAccountState = {
  isLogin: false,
  account: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    status: AccountStatus.Suspended,
    typeAuth: AccountTypeAuth.LOCAL,
    accountRole: AccountRole.User,
  },
  sessionId: '',
  greeting: '',
  isFetching: false,
  initialFetching: false,
  error: {
    errorCode: '',
  },
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: ILoginRequestDTO) => {
  const res = await AuthApi.authUser(email, password);

  return res;
});

export const recoverUser = createAsyncThunk('auth/recover-user', async () => {
  const tokenBundle = localStorageService.get();
  const res = await AuthApi.recoverUser(tokenBundle.accessToken);
  return res;
});

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialFetchingDone(state, action) {
      state.initialFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorageService.set(action.payload.data.access);
      state.isLogin = true;
      state.account = { ...action.payload.data.account };
      state.isFetching = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(recoverUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(recoverUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.account = { ...action.payload.data.account };
      state.isFetching = false;
    });
    builder.addCase(recoverUser.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const selectIsLogin = (state: MainState) => state.auth.isLogin;
export const selectEmail = (state: MainState) => state.auth.account.email;
export const selectAccountId = (state: MainState) => state.auth.account.id;
export const selectFetching = (state: MainState) => state.auth.isFetching;
export const selectInitialFetching = (state: MainState) => state.auth.initialFetching;

export const { initialFetchingDone } = authSlicer.actions;

export default authSlicer.reducer;
