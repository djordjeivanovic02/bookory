import { createReducer, on } from "@ngrx/store";
import { BestAuthorsDto } from "../../dtos/best-authors.dto";
import { loadAllAuthorsSuccess, loadAuthorBooksSuccess, loadAuthorByFirstLetter, loadAuthorByFirstLetterSuccess, loadAuthorByIdSuccess, loadBestAuthorsSuccess } from "./author.actions";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";
import { removeBookFromSavedListSuccess } from "../book/book.actions";
import { AuthorDataDto } from "../../dtos/author-data.dto";

export interface AuthorState {
    bestAuthors: BestAuthorsDto[] | null,
    bestAuthorsLoaded: boolean;

    allAuthors: AuthorDataDto[] | null;
    allAuthorsLoaded: boolean;

    authorBooksSkip: number;

    filteredAuthors: AuthorDataDto[] | null;
};

export const initialState: AuthorState = {
    bestAuthors: null,
    bestAuthorsLoaded: false,

    allAuthors: null,
    allAuthorsLoaded: false,

    filteredAuthors: null,

    authorBooksSkip: 0
};

export const authorReducer = createReducer(
    initialState,
    on(loadBestAuthorsSuccess, (state, {bestAuthors}) => ({
        ...state,
        bestAuthors: bestAuthors,
        bestAuthorsLoaded: true
    })),
    on(saveBookSuccess, (state, { savedBook }) => {
        const updatedBestAuthors = state.bestAuthors ? state.bestAuthors.map(element => {
            if (element.id === savedBook.book.author.id) {
                return {
                    ...element,
                    totalSaves: element.totalSaves + 1
                };
            }
            return element;
        }) : null;

        return {
            ...state,
            bestAuthors: updatedBestAuthors
        };
    }),
    on(removeSavedBookSuccess, (state, { book_id, author_id }) => {
        const updatedBestAuthors = state.bestAuthors ? state.bestAuthors.map(element => {
            if (element.id === author_id) {
                return {
                    ...element,
                    totalSaves: element.totalSaves > 0 ? element.totalSaves - 1 : 0
                };
            }
            return element;
        }) : null;

        return {
            ...state,
            bestAuthors: updatedBestAuthors
        };
    }),
    on(loadAllAuthorsSuccess, (state, { authors }) => ({
        ...state,
        allAuthors: [
            ...state.allAuthors || [],
            ...authors.filter(author => !state.allAuthors?.some(existingAuthor => existingAuthor.id === author.id))
        ],
        allAuthorsLoaded: true
    })),
    on(loadAuthorByFirstLetterSuccess, (state, {filteredAuthors}) => ({
        ...state,
        filteredAuthors: filteredAuthors
    })),
    on(loadAuthorByIdSuccess, (state, {loadedAuthor}) => ({
        ...state,
        allAuthors: [...state.allAuthors?.filter(element => element !== loadedAuthor) || [], loadedAuthor]
    })),
    on(loadAuthorBooksSuccess, (state, {books, author_id}) => ({
        ...state,
        allAuthors: state.allAuthors
            ?
            state.allAuthors.map(author => 
                author.id === author_id 
                ? { 
                    ...author, 
                    books: [...(author.books || []), ...books] 
                    } 
                : author
            )
            : null,
        authorBooksSkip: state.authorBooksSkip + books.length
    }))
)