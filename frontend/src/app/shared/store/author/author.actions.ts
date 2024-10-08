import { createAction, props } from "@ngrx/store";
import { BestAuthorsDto } from '../../dtos/best-authors.dto'
import { AuthorDataDto } from "../../dtos/author-data.dto";
import { BookInfoDto } from "../../dtos/book-info.dto";

//NAJBOLJI AUTORI
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

//SVI AUTORI
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

//AUTORI PO PRVOM IMENU
export const loadAuthorByFirstLetter = createAction(
    '[Author] Load Author By First Letter',
    props<{letter: string}>()
);
export const loadAuthorByFirstLetterSuccess = createAction(
    '[Author] Load Author By First Letter Success',
    props<{ filteredAuthors: AuthorDataDto[] }>()
);
export const loadAuthorByFirstLetterFailed = createAction(
    '[Author] Load Author By First Letter Failed',
    props<{ error: string }>()
);

//AUTOR NA OSNOVU ID
export const loadAuthorById = createAction(
    '[Author] Laod Author By Id',
    props<{id: number}>()
);
export const loadAuthorByIdSuccess = createAction(
    '[Author] Load Author By Id Success',
    props<{loadedAuthor: AuthorDataDto}>()
);
export const loadAuthorByIdFailed = createAction(
    '[Author] Load Author By Id Failed',
    props<{error: string}>()
);

//UCITAJ KNJIGE AUTORA
export const loadAuthorBooks = createAction(
    '[Author Books] Load Author Books',
    props<{author_id: number, skip: number, limit: number}>()
);
export const loadAuthorBooksSuccess = createAction(
    '[Author Books] Load Author Books Success',
    props<{books: BookInfoDto[], author_id: number}>()
);
export const loadAuthorBooksFailed = createAction(
    '[Author Books] Load Author Books Failed',
    props<{error: string}>()
);

//PROMENA PODATAKA
export const changeAuthorData = createAction(
    '[Author Data] Change Author Data',
    props<{author_id: number, user_id: number, authorData: FormData}>()
);
export const changeAuthorDataSuccess = createAction(
    '[Author Data] Change Author Data Success',
);
export const changeAuthorDataFailed = createAction(
    '[Author Data] Change Autor Data Failed',
    props<{error: string}>()
);

//MOJE KNJIGE
export const loadMyBooks = createAction(
    '[My Books] Load My Books',
    props<{author_id: number, skip: number, limit: number}>()
);
export const loadMyBooksSuccess = createAction(
    '[My Books] Load My Books Success',
    props<{myBooks: BookInfoDto[]}>()
);
export const loadMyBooksFailed = createAction(
    '[My Books] Load My Books Failed',
    props<{error: string}>()
);

//UKUPAN BROJ MOJIH KNJIGA
export const loadMyBooksCount = createAction(
    '[My Books Count] Load My Books Count',
    props<{author_id: number}>()
);
export const loadMyBooksCountSuccess = createAction(
    '[My Books Count] Load My Books Count Success',
    props<{myBooksCount: number}>()
);
export const loadMyBooksCountFailed = createAction(
    '[My Books Count] Load My Books Count Failed',
    props<{error: string}>()
);