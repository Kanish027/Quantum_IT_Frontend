import axios from "axios";
import {
  GetAllUsersFailure,
  GetAllUsersRequest,
  GetAllUsersSuccess,
  LoginUserFailure,
  LoginUserRequest,
  LoginUserSuccess,
  LogoutUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  RegisterUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
  UserProfileFailure,
  UserProfileRequest,
  UserProfileSuccess,
} from "../features/auth/authSlice";

// Register a new user
export const RegisterUser =
  (firstName, lastName, dob, avatar, email, password) => async (dispatch) => {
    try {
      dispatch(RegisterUserRequest());
      const { data } = await axios.post(
        "/api/api/v1/user/new",
        {
          firstName,
          lastName,
          dob,
          avatar,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(RegisterUserSuccess(data.result));
    } catch (error) {
      dispatch(RegisterUserFailure(error.response.data.message));
    }
  };

// Log in a user
export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginUserRequest());
    const { data } = await axios.post(
      "/api/api/v1/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(LoginUserSuccess(data.user));
  } catch (error) {
    dispatch(LoginUserFailure(error.response.data.message));
    console.log(error);
  }
};

// Get User Profile
export const UserProfile = () => async (dispatch) => {
  try {
    dispatch(UserProfileRequest());

    const { data } = await axios.get("/api/api/v1/user/profile");
    dispatch(UserProfileSuccess(data.user));
    console.log(data);
  } catch (error) {
    dispatch(UserProfileFailure(error.response.data.message));
  }
};

export const GetAllUsers = () => async (dispatch) => {
  try {
    dispatch(GetAllUsersRequest());

    const { data } = await axios.get("/api/api/v1/user/users");

    dispatch(GetAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(GetAllUsersFailure(error.response.data.message));
  }
};

export const LogoutUser = () => async (dispatch) => {
  try {
    dispatch(LogoutUserRequest());
    const { data } = await axios.get("/api/api/v1/user/logout");
    dispatch(LogoutUserSuccess(data.message));
    toast.success(data.message);
  } catch (error) {
    dispatch(LogoutUserFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};
