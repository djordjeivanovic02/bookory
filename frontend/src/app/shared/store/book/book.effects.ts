import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book/book.service";
import { loadNewestBooks, loadNewestBooksFailed, loadNewestBooksSuccess, loadSavedBooks } from "./book.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class BookEffects {
  loadNewestBooks = createEffect(() => 
    this.actions$.pipe(
      ofType(loadNewestBooks),
      mergeMap(action => 
        this.bookService.loadNewestBooks().pipe(
          map(response => {
            if(response){
              console.log("Ucitane su nove knjige");
              const mappedBooks = response.map(element => ({
                ...element,
                image: `http://127.0.0.1:3000/${element.image}`
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

  // loadSavedBooks = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadSavedBooks),
  //     mergeMap(action =>
  //       // this.books
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ){}
}