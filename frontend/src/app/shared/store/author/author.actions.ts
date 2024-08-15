import { createAction, props } from "@ngrx/store";
import { BestAuthorsDto } from '../../dtos/best-authors.dto'
import { AuthorDataDto } from "../../dtos/author-data.dto";

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

export const loadAllAuthors = createAction(
    '[All Authors] Load All Authors'
);
export const loadAllAuthorsSuccess = createAction(
    '[All Authors] Load All Authors Success',
    props<{authors: AuthorDataDto[]}>()
);
export const loadAllAuthorsFailed = createAction(
    '[All Authors] Load All Authors Failed',
    props<{error: string}>
);