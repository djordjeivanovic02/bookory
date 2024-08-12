import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadNewestBooksSuccess, loadSavedBookDataSuccess } from "./book.actions";
import { SavedDto } from "../../dtos/saved.dto";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";

export interface BookState{
    newestBooks: BookInfoDto[] | null;
    newestBooksLoaded: boolean;

    savedBooks: BookInfoDto[] | null;
    savedBookLoaded: boolean;
    savedBookPage: number;
    savedBookLimit: number;
}

export const initialState: BookState = {
    newestBooks: null,
    newestBooksLoaded: false,

    savedBooks: null,
    savedBookLoaded: false,
    savedBookPage: 1,
    savedBookLimit:2
}

export const bookReducer = createReducer(
    initialState,
    on(loadNewestBooksSuccess, (state, {books}) => ({
        ...state,
        newestBooks: books,
        newestBooksLoaded: true
    })),
    on(loadSavedBookDataSuccess, (state, {savedBook}) => ({
        ...state,
        savedBooks: [...(state.savedBooks || []), ...savedBook],
        savedBookLoaded: true,
        savedBookPage: state.savedBookPage+1
    })),
    //IZ USER SAVE BOOK
    on(saveBookSuccess, (state, { savedBook }) => {
        const totalSavedBooks = state.savedBooks ? state.savedBooks.length : 0;
        const maxSavedBooks = (state.savedBookPage - 1) * state.savedBookLimit;
    
        if (totalSavedBooks < maxSavedBooks) {
            return {
                ...state,
                savedBooks: [...(state.savedBooks || []), savedBook.book],
                savedBookLoaded: true
            };
        }
    
        return {
            ...state,
            savedBookLoaded: true
        };
    }),
    //IZ USER REMOVE BOOK
    // on(removeSavedBookSuccess, (state, { book_id }) => ({
    //     ...state,
    //     savedBooks: state.savedBooks
    //         ? state.savedBooks.filter(book => book.id !== book_id)
    //         : null,
    //     savedBookLoaded: true
    // }))
)