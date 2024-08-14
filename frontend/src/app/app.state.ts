import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./shared/store/auth/auth.reducer";
import { userReducer, UserState } from "./shared/store/user/user.reducer";
import { bookReducer, BookState } from "./shared/store/book/book.reducer";
import { authorReducer, AuthorState } from "./shared/store/author/author.reducer";

export interface AppState{
    auth: AuthState,
    user: UserState,
    book: BookState,
    author: AuthorState
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    user: userReducer,
    book: bookReducer,
    author: authorReducer
}