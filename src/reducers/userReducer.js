import {
  USER_ALL_GET_FAIL,
  USER_ALL_GET_REQUEST,
  USER_ALL_GET_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_GET_FOR_UPDATE_FAIL,
  USER_GET_FOR_UPDATE_REQUEST,
  USER_GET_FOR_UPDATE_RESET,
  USER_GET_FOR_UPDATE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_BY_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_REQUEST,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetaiilsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, updateUser: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_GET_REQUEST:
      return { loading: true };
    case USER_ALL_GET_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_ALL_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserForUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_FOR_UPDATE_REQUEST:
      return { loading: true };
    case USER_GET_FOR_UPDATE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_GET_FOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_FOR_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_BY_ADMIN_REQUEST:
      return { loading: true };
    case USER_UPDATE_BY_ADMIN_SUCCESS:
      return { loading: false, updatedUser: action.payload };
    case USER_UPDATE_BY_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
