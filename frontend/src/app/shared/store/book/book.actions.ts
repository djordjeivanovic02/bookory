import { createAction, props } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";

//NAJNOVIJE KNJIGE
export const loadNewestBooks = createAction(
    '[Newest Books] Load Newest Books',
);
export const loadNewestBooksSuccess = createAction(
    '[Newest Books Success] Load Newest Books Success',
    props<{books: BookInfoDto[]}>()
);
export const loadNewestBooksFailed = createAction(
    '[Newest Books Failed] Load Newest Books Failed',
    props<{error: string}>()
);

//SACUVANE KNJIGE
export const loadSavedBooks = createAction(
    '[Saved Books] Load Saved Books',
    props<{id: number}>()
);
export const loadSavedBooksSuccess = createAction(
    '[Saved Books Success] Load Saved Books Success',
    props<{savedBooks: BookInfoDto[]}>()
);
export const loadSavedBooksFailed = createAction(
    '[Saced Books Failed] Load Saved Books Success',
    props<{error: string}>()
);