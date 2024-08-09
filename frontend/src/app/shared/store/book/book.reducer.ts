import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadNewestBooksSuccess } from "./book.actions";

export interface BookState{
    newestBoox: BookInfoDto[] | null;
}

export const initialState: BookState = {
    newestBoox: null
}

export const bookReducer = createReducer(
    initialState,
    on(loadNewestBooksSuccess, (state, {books}) => ({
        ...state,
        newestBoox: books
    }))
)