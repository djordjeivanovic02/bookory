import { createReducer, on } from "@ngrx/store";
import { UserDataStoreDto } from "../../dtos/user-data.dto";
import { loadUserDataSuccess } from "./user.actions";

export interface UserState {
    user: UserDataStoreDto | null;
    userDataLoaded: boolean;
}

export const initialState: UserState = {
    user: null,
    userDataLoaded: false
}

export const userReducer = createReducer(
    initialState,
    on(loadUserDataSuccess, (state, {user}) => ({
        ...state,
        user: user,
        userDataLoaded: true
    }))
);