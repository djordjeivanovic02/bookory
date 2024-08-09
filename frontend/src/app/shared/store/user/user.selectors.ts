import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../auth/auth.reducer";

export const selectUserState = createFeatureSelector<AuthState>('user');

export const selectUserData = createSelector(
    selectUserState,
    (userState) => userState.user
)