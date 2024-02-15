import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// models
import MainState from '../interfaces/main-state';
import IAccountState from '../interfaces/account-state';

// enums
import { AccountStatus } from '../submodules/public-common/enums/account/account-status.enum';
import { AccountTypeAuth } from '../submodules/public-common/enums/account/account-type-auth.enum';
import { AccountRole } from '../submodules/public-common/enums/account/account-role.enum';
import { IAccountDTO } from '../submodules/public-common/interfaces/dto/account/iaccount.interface';


export const updateUser = createAsyncThunk('account/updateUser', async ({ account, sessionId }: { account: IAccountDTO, sessionId: string }) => {
  return { account, sessionId };
});

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

const accountSlicer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clear: (state) => {
      state.account = {...{
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        status: AccountStatus.Suspended,
        typeAuth: AccountTypeAuth.LOCAL,
        accountRole: AccountRole.User,
      }};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log('action.payload');
      console.log(action.payload);
    });
  },
});

export const selectEmail = (state: MainState) => state.accountInfo.account.email;

export const { clear } = accountSlicer.actions;

export default accountSlicer.reducer;
