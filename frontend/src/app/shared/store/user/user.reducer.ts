import { createReducer, on } from "@ngrx/store";
import { UserDataDto } from "../../dtos/user-data.dto";
import { loadUserDataSuccess } from "./user.actions";

export interface UserState {
    user: UserDataDto | null;
}

export const initialState: UserState = {
    user: null
}

export const userReducer = createReducer(
    initialState,
    on(loadUserDataSuccess, (state, {user}) => ({
        user: user
    }))
);