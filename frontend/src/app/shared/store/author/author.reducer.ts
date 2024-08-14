import { createReducer, on } from "@ngrx/store";
import { BestAuthorsDto } from "../../dtos/best-authors.dto";
import { loadBestAuthorsSuccess } from "./author.actions";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";
import { removeBookFromSavedListSuccess } from "../book/book.actions";

export interface AuthorState {
    bestAuthors: BestAuthorsDto[] | null,
    bestAuthorsLoaded: boolean;
};

export const initialState: AuthorState = {
    bestAuthors: null,
    bestAuthorsLoaded: false
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
)