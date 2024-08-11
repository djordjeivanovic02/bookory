import { createAction, props } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { SavedDto } from "../../dtos/saved.dto";

//NAJNOVIJE KNJIGE
export const loadNewestBooks = createAction(
    '[Newest Books] Load Newest Books',
);
export const loadNewestBooksSuccess = createAction(
    '[Newest Books] Load Newest Books Success',
    props<{books: BookInfoDto[]}>()
);
export const loadNewestBooksFailed = createAction(
    '[Newest Books] Load Newest Books Failed',
    props<{error: string}>()
);

//SACUVANE KNJIGE
export const loadSavedBookData = createAction(
    '[Saved Book Data] Load Saved Book Data',
    props<{user_id: number, page: number, limit: number}>()
);
export const loadSavedBookDataSuccess = createAction(
    '[Saved Book Data] Load Saved Book Data Success',
    props<{savedBook: BookInfoDto[]}>()
)
export const loadSavedBookDataFailed = createAction(
    '[Saved Book Data] Load Saved Book Data Failed',
    props<{error: string}>()
)


