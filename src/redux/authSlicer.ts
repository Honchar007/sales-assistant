import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// api
import AuthApi from '../api/auth.api';

// models
import MainState from '../interfaces/main-state';
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import { ILoginRequestDTO } from '../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';
import localStorageService from '../services/local-storage.service';

const initialState: IAccessDTO = {
  accessToken: '',
  refreshToken: '',
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: ILoginRequestDTO) => {
  const res = await AuthApi.authUser(email, password);

  return res;
});

export const refreshToken = createAsyncThunk('auth/token-refresh', async (token: string) => {
  const res = await AuthApi.refreshToken(token);
  return res;
});

export const recoverUser = createAsyncThunk('auth/recover-user', async () => {
  return {
    accessToken: '',
    refreshToken: '',
  };
});

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.data.access.accessToken;
      state.refreshToken = action.payload.data.access.refreshToken;
      localStorageService.set(action.payload.data.access);
    });
    builder.addCase(login.pending, (state) => {
      console.log(state);
    });
  },
});

export const selectAccesToken = (state: MainState) => state.auth.accessToken;
export const selectRefreshToken = (state: MainState) => state.auth.refreshToken;

export default authSlicer.reducer;
