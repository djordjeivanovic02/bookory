import { createAction, props } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { SavedDto } from "../../dtos/saved.dto";
import { DownloadDto } from "../../dtos/downloaded-book.dto";
import { CreateReviewDto } from "../../dtos/create-review.dto";
import { ReviewDto } from "../../dtos/review.dto";

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
    props<{user_id: number, skip: number, limit: number}>()
);
export const loadSavedBookDataSuccess = createAction(
    '[Saved Book Data] Load Saved Book Data Success',
    props<{savedBook: BookInfoDto[]}>()
)
export const loadSavedBookDataFailed = createAction(
    '[Saved Book Data] Load Saved Book Data Failed',
    props<{error: string}>()
)

//UKLONI KNJIGU IZ LISTE SACUVANIH
export const removeBookFromSavedList = createAction(
    '[Remove Saved Book] Remove Saved Book',
    props<{user_id: number, book_id: number, author_id: number}>()
)
export const removeBookFromSavedListSuccess = createAction(
    '[Remove Saved Book] Remove Saved Book Success',
    props<{book_id: number, author_id: number}>()
)
export const removeBookFromSavedListFailure = createAction(
    '[Remove Saved Book] Remove Saved Book Failure',
    props<{error: string}>()
)


//PREUZETE KNJIGE
export const loadDownloadedBooks = createAction(
    '[Downloaded Books] Load Downloaded Books',
    props<{user_id: number, skip: number, limit: number}>()
);
export const loadDownloadedBooksSuccess = createAction(
    '[Downloaded Books] Load Downloaded Books Success',
    props<{downloadedBooks: DownloadDto[]}>()
);
export const loadDownloadedBooksFailure = createAction(
    '[Downloaded Books] Load Downloaded Books Failure',
    props<{error: string}>()
);
export const addBookToDownloaded = createAction(
    '[Downloaded Books] New Book Added To Downloaded List',
    props<{user_id: number, book_id: number}>()
);
export const addBookToDowloadedListSuccess = createAction(
    '[Downloaded Books] New Book Added To Downloaded List Success',
    props<{downloadedBook: DownloadDto}>()
);
export const addBookToDowloadedListFailure = createAction(
    '[Downloaded Books] New Book Added To Downloaded List Failure',
    props<{error: string}>()
);

//SELEKTUJ KNJIGU
export const selectBook = createAction(
    '[Select Book] Select Book',
    props<{id: number}>()
);
export const selectBookSuccess = createAction(
    '[Select Book] Select Book Success',
    props<{selectedBook: BookInfoDto}>()
);
export const selectBookFailure = createAction(
    '[Select Boook] Select Book Failed',
    props<{error: string}>()
);

//DODAJ REVIEW
export const addReview = createAction(
    '[Add Review] Add Review',
    props<{review: CreateReviewDto}>()
);
export const addReviewSuccess = createAction(
    '[Add Review] Add Review Success',
    props<{review: ReviewDto, book_id?: number}>()
);
export const addReviewFailed = createAction(
    '[Add Review] Add Review Failure',
    props<{error: string}>()
);