import { createFeatureSelector, createSelector, select } from "@ngrx/store";
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
);
export const selectSavedBookSkip = createSelector(
    selectBookState,
    (bookState) => bookState.savedBookSkip
);
export const selectSavedBookLimit = createSelector(
    selectBookState,
    (bookState) => bookState.savedBookLimit
);

//PREUZETE KNJIGE
export const selectDownloadedBooks = createSelector(
    selectBookState,
    (bookState) => bookState.downloadedBooks
);
export const selectDownloadedBooksLoaded = createSelector(
    selectBookState,
    (bookState) => bookState.downloadedBooksLoaded
);
export const selectDownloadedBookSkip = createSelector(
    selectBookState,
    (bookState) => bookState.downloadedBooksSkip
);
export const selectDownloadedBookLimit = createSelector(
    selectBookState,
    (bookState) => bookState.downloadedBooksLimit
);


//SVE KNJIGE
export const selectAllBooks = createSelector(
    selectBookState,
    (bookState) => bookState.allBooks
);
export const selectAllBooksLoaded = createSelector(
    selectBookState,
    (bookState) => bookState.allBooksLoaded
);
export const selectAllBooksCount = createSelector(
    selectBookState,
    (bookState) => bookState.allBooksCount
);

//ODREDJENA KNJIGA
export const selectBookById = createSelector(
    selectBookState,
    (bookState) => bookState.selectedBook
);

//KATEGORIJE
export const selectAllCategories = createSelector(
    selectBookState,
    (bookState) => bookState.allCategories
);
export const selectAllCategoriesLoaded = createSelector(
    selectBookState,
    (bookState) => bookState.allCategoriesLoaded
);
