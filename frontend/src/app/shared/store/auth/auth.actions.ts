import { createAction, props } from "@ngrx/store";

//LOGIN
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);


//REGISTER USER
export const registerUser = createAction(
  '[Auth] Register User',
  props<{email: string, password: string}>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{status: boolean, data?: string}>()
)

export const registerUserFailure = createAction(
  '[Auth] Register User Error',
  props<{status: boolean, message?: string}>()
)

//REGISTER AUTHOR
export const registerr = createAction(
  '[Auth] Register',
  props<{ name: string; surname: string; email: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string}>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);


//LOGOUT
export const logout = createAction('[Auth] Logout');