import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess, loadSavedBooks, loadSavedBooksFailed, loadSavedBooksSuccess } from "./book.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { SavedService } from "../../services/saved/saved.service";
import { response } from "express";
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

  loadSavedBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSavedBooks),
      mergeMap(action =>
        this.savedService.loadUserSaves(action.id).pipe(
          map(response => {
            if(response){
              return loadSavedBooksSuccess({savedBooks: response})
            }else{
              return loadSavedBooksFailed({error: "Greska"})
            }
          }),
          catchError(error => of(loadSavedBooksFailed(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private savedService: SavedService
  ){}
}