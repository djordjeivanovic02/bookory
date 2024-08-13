import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadDownloadedBooksSuccess, loadNewestBooksSuccess, loadSavedBookDataSuccess, removeBookFromSavedListSuccess } from "./book.actions";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";
import { DownloadDto } from "../../dtos/downloaded-book.dto";

export interface BookState{
    newestBooks: BookInfoDto[] | null;
    newestBooksLoaded: boolean;

    savedBooks: BookInfoDto[] | null;
    savedBookLoaded: boolean;
    savedBookSkip: number;
    savedBookLimit: number;

    downloadedBooks: DownloadDto[] | null;
    downloadedBooksLoaded: boolean;
    downloadedBooksSkip: number;
    downloadedBooksLimit: number;
}

export const initialState: BookState = {
    newestBooks: null,
    newestBooksLoaded: false,

    savedBooks: null,
    savedBookLoaded: false,
    savedBookSkip: 0,
    savedBookLimit:2,

    downloadedBooks: null,
    downloadedBooksLoaded: false,
    downloadedBooksSkip: 0,
    downloadedBooksLimit: 2
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
    on(loadDownloadedBooksSuccess, (state, {downloadedBooks}) => ({
        ...state,
        downloadedBooks: [...(state.downloadedBooks || []), ...downloadedBooks],
        downloadedBooksLoaded: downloadedBooks && downloadedBooks.length !== 0,
        downloadedBooksSkip: downloadedBooks ? downloadedBooks.length : 0
    })),

    
)