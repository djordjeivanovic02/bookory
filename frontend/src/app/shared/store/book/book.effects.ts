import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess, loadSavedBookData, loadSavedBookDataFailed, loadSavedBookDataSuccess } from "./book.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { response } from "express";

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
        this.bookService.loadSavedBook(action.user_id, action.page, action.limit).pipe(
          map(response => {
            if (response) {
              const mappedBooks = response.map(element => ({
                ...element.book,
                image: `${environment.apiUrl}/${element.book.image}`
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
  
  

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ){}
}