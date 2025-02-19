import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from './slices/auth';
import userReducer from './slices/user/user.slice';
import { homeApi } from './slices/home';

export const RTKReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
};

export const rootReducer = combineReducers({
  user: userReducer,
  ...RTKReducer,
});
export const rootMiddleWare = [authApi.middleware, homeApi.middleware];
