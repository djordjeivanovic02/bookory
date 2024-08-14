import { createAction, props } from "@ngrx/store";
import { BestAuthorsDto } from '../../dtos/best-authors.dto'

export const loadBestAuthors = createAction(
    '[Best Authors] Load Best Authors',
);
export const loadBestAuthorsSuccess = createAction(
    '[Best Authors] Load Best Authors Success',
    props<{bestAuthors: BestAuthorsDto[]}>()
);
export const loadBestAuthorsFailed = createAction(
    '[Best Authors] Load Best Authors Failed',
    props<{error: string}>()
);