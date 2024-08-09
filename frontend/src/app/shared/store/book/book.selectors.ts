import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "./book.reducer";

export const selectBookState = createFeatureSelector<BookState>('book');

export const selectNewestBooks = createSelector(
    selectBookState,
    (userState) => userState.newestBoox
)