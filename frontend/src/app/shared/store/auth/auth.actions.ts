import { createAction, props } from "@ngrx/store";
import { UserDataDto } from "../../dtos/user-data.dto";

//LOGIN
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string, user?: UserDataDto }>()
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
export const registerAuthor = createAction(
  '[Auth] Register',
  props<{ email: string; password: string; name: string; surname: string; website?: string}>()
);

export const registerAuthorSuccess = createAction(
  '[Auth] Register Success',
  props<{status: boolean, data?: string}>()
);

export const registerAuthorFailure = createAction(
  '[Auth] Register Failure',
  props<{status: boolean, message?: string}>()
);


//LOGOUT
export const logout = createAction('[Auth] Logout');

//CHECK TOKEN
export const loadTokenSuccess = createAction(
  '[Auth] Token Loaded Successfully',
  props<{token: string, user?: UserDataDto}>()
);

export const loadTokenFailure= createAction(
  '[Auth] Token Loaded Failure'
);