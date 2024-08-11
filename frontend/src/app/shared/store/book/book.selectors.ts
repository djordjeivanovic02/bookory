import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "./book.reducer";

export const selectBookState = createFeatureSelector<BookState>('book');

//NAJNOVIJE KNJIGE
export const selectNewestBooks = createSelector(
    selectBookState,
    (bookSate) => bookSate.newestBooks
);
export const selectNewestBooksLoaded = createSelector(
    selectBookState,
    (bookSate) => bookSate.newestBooksLoaded
);

//SACUVANE KNJIGE
export const selectSavedBooksData = createSelector(
    selectBookState,
    (bookState) => bookState.savedBooks
);
export const selectSavedBooksDataLoaded = createSelector(
    selectBookState,
    (bookState) => bookState.savedBookLoaded
)
export const selectSavedBookPage = createSelector(
    selectBookState,
    (bookState) => bookState.savedBookPage
)
export const selectSavedBookLimit = createSelector(
    selectBookState,
    (bookState) => bookState.savedBookLimit
)