import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadNewestBooksSuccess } from "./book.actions";

export interface BookState{
    newestBooks: BookInfoDto[] | null;
    newestBooksLoaded: boolean;

}

export const initialState: BookState = {
    newestBooks: null,
    newestBooksLoaded: false
}

export const bookReducer = createReducer(
    initialState,
    on(loadNewestBooksSuccess, (state, {books}) => ({
        ...state,
        newestBooks: books,
        newestBooksLoaded: true
    }))
)