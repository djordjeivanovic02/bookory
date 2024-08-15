import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorState } from "./author.reducer";

export const selectAuthorState = createFeatureSelector<AuthorState>('author');

//NAJBOLJI AUTORI
export const selectBestAuthors = createSelector(
    selectAuthorState,
    (authorState) => authorState.bestAuthors
);
export const selectBestAuthorsLoaded = createSelector(
    selectAuthorState,
    (authorState) => authorState.bestAuthorsLoaded
);

//SVI AUTORI
export const selectAllAuthors = createSelector(
    selectAuthorState,
    (authorState) => authorState.allAuthors
);
export const selectAllAuthorsLoaded = createSelector(
    selectAuthorState,
    (authorState) => authorState.allAuthorsLoaded
);