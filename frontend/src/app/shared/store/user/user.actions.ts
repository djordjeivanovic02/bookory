import { createAction, props } from "@ngrx/store";
import { UserDataDto, UserDataStoreDto } from "../../dtos/user-data.dto";
import { SavedDto } from "../../dtos/saved.dto";

export const loadUserData = createAction(
    '[User] Load Data',
    props<{id: number}>()
);
export const loadUserDataSuccess = createAction(
    '[User] Load Data Success',
    props<{user: UserDataStoreDto}>()
);
export const loadUserDataFailure = createAction(
    '[User] Load Data Failure',
    props<{error: string}>()
);

//SACUVAJ KNJIGU 
export const saveBook = createAction(
    '[Save Book] Save New Book',
    props<{user_id: number, book_id: number}>()
)
export const saveBookSuccess = createAction(
    '[Save Book] Save Book Success',
    props<{savedBook: SavedDto}>()
)
export const saveBookFailed = createAction(
    '[Save Book] Save Book Failed',
    props<{error: string}>()
)