import { createAction, props } from "@ngrx/store";
import { UserDataDto, UserDataStoreDto } from "../../dtos/user-data.dto";

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