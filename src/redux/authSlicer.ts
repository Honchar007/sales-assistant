import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// api
import AuthApi from '../api/auth.api';

// models
import { IAccessDTO } from '../submodules/public-common/interfaces/dto/auth/iaccess.interface';
import { ILoginRequestDTO } from '../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';

const initialState: IAccessDTO = {
  accessToken: '',
  refreshToken: '',
};

export const login = createAsyncThunk('login', async ({ email, password }: ILoginRequestDTO) => {
  const res = await AuthApi.authUser(email, password);

  return res;
});

export const refreshToken = createAsyncThunk('token/refresh', async (token: string) => {
  const res = await AuthApi.refreshToken(token);
  return res;
});

export const recoverUser = createAsyncThunk('recover-user', async () => {
  return {
    accessToken: '',
    refreshToken: '',
  };
});

const authSlicer = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(login.pending, (state) => {
      console.log(state);
    });
  },
});

export const selectAccesToken = (state: IAccessDTO) => state.accessToken;
export const selectRefreshToken = (state: IAccessDTO) => state.refreshToken;

export default authSlicer.reducer;
