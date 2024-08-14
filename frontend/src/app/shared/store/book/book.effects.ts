import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { addBookToDowloadedListFailure, addBookToDowloadedListSuccess, addBookToDownloaded, loadDownloadedBooks, loadDownloadedBooksFailure, loadDownloadedBooksSuccess, loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess, loadSavedBookData, loadSavedBookDataFailed, loadSavedBookDataSuccess, removeBookFromSavedList, removeBookFromSavedListFailure, removeBookFromSavedListSuccess } from "./book.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { environment } from "../../../../environments/environment";

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
                image: `${environment.apiUrl}/${element.image}`
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
                book: {...element.book, image: `${environment.apiUrl}/${element.book.image}`}
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
  
  

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ){}
}