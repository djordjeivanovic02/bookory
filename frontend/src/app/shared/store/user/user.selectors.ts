import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../auth/auth.reducer";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserData = createSelector(
    selectUserState,
    (userState) => userState.user
)