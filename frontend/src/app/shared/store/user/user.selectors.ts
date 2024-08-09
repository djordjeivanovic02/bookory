import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "../auth/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('user');