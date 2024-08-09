import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./shared/store/auth/auth.reducer";
import { userReducer, UserState } from "./shared/store/user/user.reducer";

export interface AppState{
    auth: AuthState,
    user: UserState
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    user: userReducer,
}