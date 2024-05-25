import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginUserRequest: (state) => {
      state.isLoading = true;
    },
    LoginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    RegisterUserRequest: (state) => {
      state.isLoading = true;
    },
    RegisterUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    RegisterUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    LogoutUserRequest: (state) => {
      state.isLoading = true;
    },
    LogoutUserSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "Logout successful";
    },
    LogoutUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    UserProfileRequest: (state) => {
      state.isLoading = true;
    },
    UserProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    UserProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    GetAllUsersRequest: (state) => {
      state.isLoading = true;
    },
    GetAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.allusers = action.payload;
    },
    GetAllUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LoginUserRequest,
  LoginUserSuccess,
  LoginUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
  RegisterUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,
  UserProfileRequest,
  UserProfileSuccess,
  UserProfileFailure,
  GetAllUsersRequest,
  GetAllUsersSuccess,
  GetAllUsersFailure,
} = authSlice.actions;

export default authSlice.reducer;
