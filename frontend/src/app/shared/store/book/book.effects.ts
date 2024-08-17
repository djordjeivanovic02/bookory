import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { addBookToDowloadedListFailure, addBookToDowloadedListSuccess, addBookToDownloaded, addReview, addReviewFailed, addReviewSuccess, loadDownloadedBooks, loadDownloadedBooksFailure, loadDownloadedBooksSuccess, loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess, loadSavedBookData, loadSavedBookDataFailed, loadSavedBookDataSuccess, removeBookFromSavedList, removeBookFromSavedListFailure, removeBookFromSavedListSuccess, selectBook, selectBookFailure, selectBookSuccess } from "./book.actions";
import { catchError, map, mergeMap, of, switchMap, take } from "rxjs";
import { environment } from "../../../../environments/environment";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import { selectAllBooks, selectNewestBooks } from "./book.selectors";
import { ReviewService } from "../../services/review/review.service";
import { loadBestAuthors } from "../author/author.actions";

@Injectable()
export class BookEffects {
  loadNewestBooks = createEffect(() => 
    this.actions$.pipe(
      ofType(loadNewestBooks),
      mergeMap(action => 
        this.bookService.loadNewestBooks().pipe(
          map(response => {
            if(response){
              const mappedBooks = response.map(element => ({
                ...element,
                image: `${environment.apiUrl}/${element.image}`,
                pdf: `${environment.apiUrl}/${element.pdf}`,
                reviews: element.reviews?.map(review => ({
                  ...review,
                  user: {
                    id: review.user.id,
                    email: review.user.email,
                    created_at: review.user.created_at
                  }
                }))
              }));
              return loadNewestBooksSuccess({ books: mappedBooks });
            }else{
              return loadNewestBooksFailed({error: "Greska"});
            }
          }),
          catchError(error => of(loadNewestBooksFailed({error})))
        )
      )
    )
  );

  loadSavedBook = createEffect(() => 
    this.actions$.pipe(
      ofType(loadSavedBookData),
      mergeMap(action =>
        this.bookService.loadSavedBook(action.user_id, action.skip, action.limit).pipe(
          map(response => {
            if (response) {
              const mappedBooks = response.map(element => ({
                ...element.book,
                image: `${environment.apiUrl}/${element.book.image}`,
                pdf: `${environment.apiUrl}/${element.book.pdf}`,
                author: element.book.author
              }));
              return loadSavedBookDataSuccess({ savedBook: mappedBooks });
            } else {
              return loadSavedBookDataFailed({ error: "Greska" });
            }
          })
        )
      )
    )
  );

  removeFromSavedList = createEffect(() =>
    this.actions$.pipe(
      ofType(removeBookFromSavedList),
      mergeMap(action =>
        this.bookService.removeSavedBook(action.user_id, action.book_id).pipe(
          map(response => {
            if(response){
              return removeBookFromSavedListSuccess({book_id: action.book_id, author_id: action.author_id})
            }else{
              return removeBookFromSavedListFailure({error: "Greska"})
            }
          }),
          catchError(error => of(removeBookFromSavedListFailure({error})))
        )
      )
    )
  );

  loadDownloadedBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDownloadedBooks),
      mergeMap(action => 
        this.bookService.loadDownloadedBooks(action.user_id, action.skip, action.limit).pipe(
          map(response => {
            if(response){
              const mappedBooks = response.map(element => ({
                ...element,
                book: {
                  ...element.book, 
                  image: `${environment.apiUrl}/${element.book.image}`,
                  pdf: `${environment.apiUrl}/${element.book.pdf}`
                }
              }));
              return loadDownloadedBooksSuccess({downloadedBooks: mappedBooks});
            }else{
              return loadDownloadedBooksFailure({error: "Greska"});
            }
          }),
          catchError(error => of(loadDownloadedBooksFailure({error})))
        )
      )
    )
  );


  addBookToDownloadedList = createEffect(() => 
    this.actions$.pipe(
      ofType(addBookToDownloaded),
      mergeMap(action => 
        this.bookService.addBookToDowloadedList(action.book_id, action.user_id).pipe(
          map(response => {
            if(response){
              response.book.image = `${environment.apiUrl}/${response.book.image}`;
              response.book.pdf = `${environment.apiUrl}/${response.book.pdf}`;
              return addBookToDowloadedListSuccess({downloadedBook: response})
            }else{
              return addBookToDowloadedListFailure({error: "Greska"})
            }
          }),
          catchError(error => of(addBookToDowloadedListFailure({error})))
        )
      )
    )
  );
  
  selectBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectBook),
      mergeMap(action => 
        this.store.pipe(
          select(selectAllBooks),
          take(1),
          mergeMap(allBooks => {
            let selectedBook = allBooks?.find(book => book.id === action.id);
            if (!selectedBook) {
              return this.store.pipe(
                select(selectNewestBooks),
                take(1),
                mergeMap(newestBooks => {
                  selectedBook = newestBooks?.find(book => book.id === action.id);
                  if (selectedBook) {
                    return of(selectBookSuccess({ selectedBook }));
                  } else {
                    return this.bookService.selectBook(action.id).pipe(
                      map(book => {
                        if(book){
                          book = {
                            ...book,
                            image: `${environment.apiUrl}/${book.image}`,
                            pdf: `${environment.apiUrl}/${book.pdf}`
                          }
                          return selectBookSuccess({ selectedBook: book })}
                        else{
                          return selectBookFailure({error: "Greska"})
                        }
                      }),
                      catchError(error => of(selectBookFailure({ error: error.message })))
                    ); 
                  }
                })
              );
            } else {
              return of(selectBookSuccess({ selectedBook }));
            }
          })
        )
      )
    )
  );

  addReview = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      mergeMap(action => 
        this.reviewService.addReview(action.review).pipe(
          switchMap(response => {
            if(response){
              return [
                addReviewSuccess({review: response, book_id: action.review.book_id}),
                loadBestAuthors()
              ];
            }else{
              return of(addReviewFailed({error: "Greska"}));
            }
          }),
          catchError(error => of(addReviewFailed({error})))
        )
      )
    )
  );
  
  

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private reviewService: ReviewService,
    private store: Store,
  ){}
}