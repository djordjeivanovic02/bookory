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

//AUTORI NA OSNOVU SLOVA PRVOG IMENA
export const selectAuthorsByFirstLetter = createSelector(
    selectAuthorState,
    (authorState) => authorState.filteredAuthors
)

//AUTOR NA OSNOVU ID
export const selectAuthorById = (id: number) => createSelector(
    selectAuthorState,
    (state) => state.allAuthors?.find(author => author.id === id) || null
);