import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadNewestBooksSuccess, loadSavedBookDataSuccess, removeBookFromSavedListSuccess } from "./book.actions";
import { SavedDto } from "../../dtos/saved.dto";
import { removeSavedBookSuccess, saveBook, saveBookSuccess } from "../user/user.actions";

export interface BookState{
    newestBooks: BookInfoDto[] | null;
    newestBooksLoaded: boolean;

    savedBooks: BookInfoDto[] | null;
    savedBookLoaded: boolean;
    savedBookSkip: number;
    savedBookLimit: number;
}

export const initialState: BookState = {
    newestBooks: null,
    newestBooksLoaded: false,

    savedBooks: null,
    savedBookLoaded: false,
    savedBookSkip: 0,
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
        savedBookLoaded: savedBook.length !== 0,
        savedBookSkip: state.savedBookSkip+savedBook.length
    })),
    //IZ USER SAVE BOOK
    on(saveBookSuccess, (state, { savedBook }) => {
        const totalSavedBooks = state.savedBooks?.length || 0;
        let newBooks = [];
        let step = 0;

        if (state.savedBooks && totalSavedBooks) {
            if (totalSavedBooks % state.savedBookLimit === 0) {
                newBooks = [savedBook.book, ...state.savedBooks.slice(0, totalSavedBooks - 1)];
            } else {
                newBooks = [savedBook.book, ...state.savedBooks];
                step = 1;
            }
        } else {
            newBooks = [savedBook.book];
            step = 1;
        }
        return {
            ...state,
            savedBooks: newBooks,
            savedBookLoaded: true,
            savedBookSkip: state.savedBookSkip + step
        };
    }),
    
    // IZ USER REMOVE BOOK
    on(removeSavedBookSuccess, (state, { book_id }) => {
        const updatedSavedBooks = state.savedBooks
            ? state.savedBooks.filter(book => book.id !== book_id)
            : [];

        const deff = (updatedSavedBooks.length < state.savedBooks?.length!) ? 1 : 0;
        const newSkip = state.savedBookSkip - deff;

        return {
            ...state,
            savedBooks: updatedSavedBooks.length === 0 ? null : updatedSavedBooks,
            savedBookSkip: newSkip,
            savedBookLoaded: newSkip === 0 ? false: true,
        };
    }),
    // on(removeBookFromSavedListSuccess, (state, {book_id}) => {
    //     const updatedSavedBooks = state.savedBooks
    //         ? state.savedBooks.filter(book => book.id !== book_id)
    //         : [];
    //     return {
    //         ...state,
    //         savedBooks: updatedSavedBooks,
    //         savedBookPage: updatedSavedBooks.length !==0 ? state.savedBookLimit-1 : 1,
    //         savedBookLoaded: updatedSavedBooks.length !== 0 ? true : false
    //     };
    // })
    
    
)