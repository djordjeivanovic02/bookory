import { createReducer, on } from "@ngrx/store";
import { UserDataStoreDto } from "../../dtos/user-data.dto";
import { loadUserDataFailure, loadUserDataSuccess, removeSavedBookSuccess, saveBookFailed, saveBookSuccess } from "./user.actions";
import { addBookToDowloadedListSuccess, removeBookSuccess } from "../book/book.actions";

export interface UserState {
    user: UserDataStoreDto | null;
    userDataLoaded: boolean;
    error: string | null;
}

export const initialState: UserState = {
    user: null,
    userDataLoaded: false,
    error: null
}

export const userReducer = createReducer(
    initialState,
    on(loadUserDataSuccess, (state, {user}) => ({
        ...state,
        user: user,
        userDataLoaded: true
    })),
    on(loadUserDataFailure, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(saveBookSuccess, (state, {savedBook}) => ({
        ...state,
        user: state.user
            ? {
                ...state.user,
                savedBooks: [...(state.user.savedBooks || []), savedBook.book.id]
            }: null
    })),
    on(saveBookFailed, (state, {error}) => ({
        ...state,
        error: error
    })),
    on(removeSavedBookSuccess, (state, {book_id}) => ({
        ...state,
        user: state.user
            ? {
                ...state.user,
                savedBooks: state.user.savedBooks?.filter(id => id !== book_id) || []
            }
            : null
    })),
    // IZ LISTE PREUZETIH KNJIGA
    on(addBookToDowloadedListSuccess, (state, {downloadedBook}) => ({
        ...state,
        user: state.user 
            ? {
                ...state.user,
                downloadedBooks: [...state.user?.downloadedBooks || [], downloadedBook.book.id]
            }
            : null
    })),

    on(removeBookSuccess, (state, { book_id, author_id }) => {
        const newSavedBooks = state.user?.savedBooks?.filter(book => book !== book_id) || [];
      
        return {
          ...state,
          user: state.user ? {
            ...state.user,
            savedBooks: newSavedBooks
          } : null
        };
      })
      
);