import { createAction, props } from "@ngrx/store";

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
  
  
  export const logout = createAction('[Auth] Logout');