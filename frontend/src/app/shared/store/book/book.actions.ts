import { createAction, props } from "@ngrx/store";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { DownloadDto } from "../../dtos/downloaded-book.dto";
import { CreateReviewDto } from "../../dtos/create-review.dto";
import { ReviewDto } from "../../dtos/review.dto";
import { FilterDto } from "../../dtos/filter.dto";
import { AuthorDataDto } from "../../dtos/author-data.dto";

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


//SVE KATEGORIJE
export const loadCategories = createAction(
    '[All Categories] Load All Categories',
);
export const loadCategoriesSuccess = createAction(
    '[All Categories] Load All Categories Success',
    props<{categories: string[]}>()
);
export const loadCategoriesFailed = createAction(
    '[All Categories] Load All Categories Failed',
    props<{error: string}>()
);

//SVE KNJIGE
export const loadAllBooks = createAction(
    '[Filter Books] Load Filter Books',
    props<{filters: FilterDto, reset: boolean}>()
);
export const loadAllBooksSuccess = createAction(
    '[Filter Books] Load Filter Books Success',
    props<{filteredBooks: BookInfoDto[], count: number, reset: boolean, filters: FilterDto}>()
);
export const loadAllBooksFailed = createAction(
    '[Filter Books] Load Filter Books Failed',
    props<{error: string}>()
);

//AUTORI NA OSNOVU KATEGORIJA
export const loadAuthorsByCategories = createAction(
    '[Authors By Categories] Load Authors By Categories',
    props<{categories: string[]}>()
);
export const loadAuthorsByCategoriesSuccess = createAction(
    '[Authors By Categories] Load Authors By Categories Succcess',
    props<{authors: AuthorDataDto[]}>()
);
export const loadAuthorsByCategoriesFailed = createAction(
    '[Authors By Categories] Load Authors By Categories Failed',
    props<{error: string}>()
);

//KATEGORIJE NA OSNOVU AUTORA
export const loadCategoriesByAuthors = createAction(
    '[Categories By Authors] Load Categories By Authors',
    props<{authors: number[]}>()
);
export const loadCategoriesByAuthorsSuccess = createAction(
    '[Categories By Authors] Load Categories By Authors Succcess',
    props<{categories: string[]}>()
);
export const loadCategoriesByAuthorsFailed = createAction(
    '[Categories By Authors] Load Categories By Authors Failed',
    props<{error: string}>()
);

//FILTERI
export const loadFilters = createAction(
    '[Filters] Load Filters'
);
export const loadFiltersSuccess = createAction(
    '[Filters] Load FiltersSuccess',
);
export const loadFiltersFailed = createAction(
    '[Filters] Load FiltersFailed',
    props<{error: string}>()
);

//OBRISI KNJIGU
export const removeBook = createAction(
    '[Remove Book] Remove Book',
    props<{book_id: number, author_id: number}>()
);
export const removeBookSuccess = createAction(
    '[Remove Book] Remove Book Success',
    props<{book_id: number, author_id: number}>()
);
export const removeBookFailed = createAction(
    '[Remove Book] Remove Book Failed',
    props<{error: string}>()
);

//DODAJ KNJIGU
export const addNewBook = createAction(
    '[New Book] Add New Book',
    props<{bookData: FormData}>()
);
export const addNewBookSuccess = createAction(
    '[New Book] Add New Book Success',
    props<{book: BookInfoDto}>()
);
export const addNewBookFailed = createAction(
    '[New Book] Add New Book Failed',
    props<{error: string}>()
);