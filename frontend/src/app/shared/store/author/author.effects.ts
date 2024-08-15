import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthorService } from "../../services/author/author.service";
import { loadAllAuthors, loadAllAuthorsSuccess, loadBestAuthors, loadBestAuthorsFailed, loadBestAuthorsSuccess } from "./author.actions";
import { catchError, map, mergeMap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { response } from "express";


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
              return loadAllAuthorsSuccess({authors: response});
            }else{
              return loadBestAuthorsFailed({error: "Greska"});
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authorService: AuthorService
  ){}
}