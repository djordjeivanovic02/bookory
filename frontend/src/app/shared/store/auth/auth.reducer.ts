import { createReducer, on } from "@ngrx/store";
import { loginFailure, loginSuccess, logout, registerFailure, registerSuccess } from "./auth.actions";

export interface AuthState {
    token: string | null;
    user: any | null;
    error: any;
  }
  
  export const initialState: AuthState = {
    token: null,
    user: null,
    error: null
  };
  
  export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token}) => ({
      ...state,
      token,
      error: null
    })),
    on(loginFailure, (state, { error }) => ({
      ...state,
      token: null,
      user: null,
      error
    })),
    on(logout, state => ({
      ...state,
      token: null,
      user: null,
      error: null
    })),
    on(registerSuccess, (state, { token }) => ({
      ...state,
      token,
      error: null,
    })),
    on(registerFailure, (state, { error }) => ({
      ...state,
      error,
    })),
  );