import { createAction, props } from "@ngrx/store";

export const setToken = createAction(
    '[Aiuth] Set Token',
    props<{token: string}>()
)

export const clearToken = createAction(
    '[Auth] Clear Token'
)
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
    props<{ error: string }>()
);