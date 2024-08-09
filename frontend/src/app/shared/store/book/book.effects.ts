import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess } from "./book.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class BookEffects {
  loadNewestBooks = createEffect(() => 
    this.actions$.pipe(
      ofType(loadNewestBooks),
      mergeMap(action => 
        this.bookService.loadNewestBooks().pipe(
          map(response => {
            console.log("Response: ", response);
            if(response){
              return loadNewestBooksSuccess({books: response});
            }else{
              return loadNewestBooksFailed({error: "Greska"});
            }
          }),
          catchError(error => of(loadNewestBooksFailed({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ){}
}