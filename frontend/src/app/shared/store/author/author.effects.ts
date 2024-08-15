import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthorService } from "../../services/author/author.service";
import { loadAllAuthors, loadAllAuthorsSuccess, loadAuthorByFirstLetter, loadAuthorByFirstLetterSuccess, loadBestAuthors, loadBestAuthorsFailed, loadBestAuthorsSuccess } from "./author.actions";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { response } from "express";
import { Store } from "@ngrx/store";
import { selectAllAuthors } from "./author.selectors";


@Injectable()
export class AuthorEffects {
  loadBestAuthors = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBestAuthors),
      mergeMap(action =>
        this.authorService.loadBestAuthors().pipe(
          map(response => {
            if(response){
              const mappedBooks = response.map(element => ({
                ...element,
                image: (element.image) ? `${environment.apiUrl}/${element.image}` : 'assets/images/best-author.jpg'
              }));
              return loadBestAuthorsSuccess({bestAuthors: mappedBooks});
            }else{
              return loadBestAuthorsFailed({error: "Greska"});
            }
          })
        )
      )
    )
  );

  loadAllAuthors = createEffect(() => 
    this.actions$.pipe(
      ofType(loadAllAuthors),
      mergeMap(action => 
        this.authorService.loadAllAuthors().pipe(
          map(response => {
            if(response){
              const mappedBooks = response.map(element => ({
                ...element,
                picture: (element.picture) ? `${environment.apiUrl}/${element.picture}` : 'assets/images/best-author.jpg'
              }));
              return loadAllAuthorsSuccess({authors: mappedBooks});
            }else{
              return loadBestAuthorsFailed({error: "Greska"});
            }
          })
        )
      )
    )
  );

  loadAuthorsByFirstLetter = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthorByFirstLetter),
      withLatestFrom(this.store.select(selectAllAuthors)),
      mergeMap(([action, allAuthors]) => {
        const filteredAuthors = allAuthors?.filter(author =>
          author.firstName.toLowerCase().startsWith(action.letter.toLowerCase())
        ) || [];
        return [loadAuthorByFirstLetterSuccess({ filteredAuthors: filteredAuthors })];
      })
    )
  );
  constructor(
    private actions$: Actions,
    private authorService: AuthorService,
    private store: Store
  ){}
}