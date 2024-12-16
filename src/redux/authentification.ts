import AuthService from 'api/services/AuthService';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { IUserInstance } from 'models/IUserInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'authentification/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const authResponse = (await AuthService.login(email, password)).data;
      return { data: authResponse };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError);
    }
  },
);

export const register = createAsyncThunk(
  'authentification/register',
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const registerResponse = (
        await AuthService.register(name, email, password)
      ).data;
      return { data: registerResponse };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const verify = createAsyncThunk(
  'authentification/verify',
  async (
    { userId, code }: { userId: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      await AuthService.verify(userId, code);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkAuth = createAsyncThunk(
  'authentification/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const authResponse = (await AuthService.checkAuth()).data;
      return { data: authResponse };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'authentification/logout',
  async () => {
    await AuthService.logout();
  },
);

interface AuthState {
  user?: IUserInstance;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  isVerifyError: boolean;
}

const initialState: AuthState = {
  isAuth: !!Cookies.get('AccessToken'),
  isLoading: false,
  isError: false,
  isVerifyError: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as IUserInstance;
      state.isAuth = false;
      state.isLoading = false;
      Cookies.remove('AccessToken');
      Cookies.remove('RefreshToken');
    },
    clearError: (state) => {
      state.isError = false;
      state.isVerifyError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        const payload = action.payload as AxiosError<{ user: IUserInstance }>;
        state.isVerifyError = payload.status == 403;
        state.user = payload?.response?.data?.user;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(verify.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.user = undefined;
        Cookies.remove('AccessToken');
        Cookies.remove('RefreshToken');
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        },
      );
  },
  selectors: {
    getUser: (state) => state.user,
    getStateAuth: (state) => state.isAuth,
    getStateVerifyError: (state) => state.isVerifyError,
    getStateAuthError: (state) => state.isError,
    getStateAuthLoading: (state) => state.isLoading,
  },
});

export const { logout, clearError } = slice.actions;
export const {
  getUser,
  getStateAuth,
  getStateVerifyError,
  getStateAuthError,
  getStateAuthLoading,
} = slice.selectors;

export default slice.reducer;
