import { createReducer, on } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { addBookToDowloadedListSuccess, addReviewSuccess, loadAllBooksSuccess, loadAuthorsByCategoriesSuccess, loadCategories, loadCategoriesSuccess, loadDownloadedBooksSuccess, loadFiltersSuccess, loadNewestBooksSuccess, loadSavedBookDataSuccess, removeBookSuccess, selectBookSuccess } from "./book.actions";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";
import { DownloadDto } from "../../dtos/downloaded-book.dto";
import { FilterDto } from "../../dtos/filter.dto";
import { loadAllAuthorsSuccess } from "../author/author.actions";

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

    allBooks: BookInfoDto[] | null;
    allBooksLoaded: boolean | null;
    allBooksCount: number;

    selectedBook: BookInfoDto | null;

    filters: FilterDto,
    filtersLoaded: boolean,

    allCategories: string[] | null;
    allCategoriesLoaded: boolean;
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
    downloadedBooksLimit: 2,

    allBooks: null,
    allBooksLoaded: false,
    allBooksCount: 0,

    selectedBook: null,

    filters: {
        categories: [],
        authors: [],
        skip: 0,
        limit: 2,
        sort: 0
    },
    filtersLoaded: false,

    allCategories: null,
    allCategoriesLoaded: false
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
    on(addBookToDowloadedListSuccess, (state, {downloadedBook}) => {
        const totalDownloadedBooks = state.downloadedBooks?.length || 0;
        let newBooks: DownloadDto[] | null= [];
        let step = 0;

        if (state.downloadedBooks && state.downloadedBooks.length && totalDownloadedBooks) {
            if (totalDownloadedBooks % state.savedBookLimit === 0) {
                newBooks = [downloadedBook, ...state.downloadedBooks.slice(0, totalDownloadedBooks - 1)];
            } else {
                newBooks = [downloadedBook, ...state.downloadedBooks];
                step = 1;
            }
        } else {
            newBooks = null;
        }
        return {
            ...state,
            downloadedBooks: newBooks,
            downloadedBooksSkip: state.downloadedBooksSkip + step
        };
    }),
    on(selectBookSuccess, (state, {selectedBook}) => ({
        ...state,
        selectedBook: selectedBook
    })),
    on(addReviewSuccess, (state, {review, book_id}) => ({
        ...state,
        selectedBook: state.selectedBook
            ? {
                ...state.selectedBook,
                reviews: [...state.selectedBook.reviews || [], review]
            }
            : null,
        newestBooks: state.newestBooks
            ? state.newestBooks.map(book => 
                book.id === book_id
                    ? { 
                        ...book, 
                        reviews: [...book.reviews || [], review] 
                      }
                    : book
            )
            : null 
    })),
    on(loadAllBooksSuccess, (state, {filteredBooks, count, reset, filters}) => ({
        ...state,
        allBooks: (!reset) ? [...state.allBooks || [], ...filteredBooks] : filteredBooks,
        allBooksLoaded: true,
        allBooksCount: count,
        filters: {
            ...state.filters,
            categories: filters.categories,
            authors: filters.authors,
            limit: filters.limit,
            skip: (!reset) ? state.filters.skip + filteredBooks.length : filteredBooks.length
        }
    })),
    on(loadCategoriesSuccess, (state, {categories}) => ({
        ...state,
        allCategories: categories,
        allCategoriesLoaded: true
    })),
    on(loadFiltersSuccess, (state) => ({
        ...state,
        filtersLoaded: true
    })),
    on(loadAuthorsByCategoriesSuccess, (state, {authors}) => ({
        ...state,
        filters: {
            ...state.filters,
            authors: authors
        }
    })),
    on(removeBookSuccess, (state, {book_id, author_id}) => {
        let newAllBooks = state.allBooks;
        let newAllBooksCount = state.allBooksCount;
        if(state.allBooks && state.allBooks.length > 0){
            if(state.allBooks.findIndex(element => element.id === book_id) !== -1 && newAllBooks){
                newAllBooks = newAllBooks.filter(element => element.id !== book_id);
            }
            newAllBooksCount = newAllBooksCount - 1;
        }
        return {
            ...state,
            newestBooksLoaded: false,
            savedBookLoaded: false,
            allBooks: newAllBooks,
            allBooksCount: newAllBooksCount
        }
    })
)