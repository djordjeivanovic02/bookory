import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthorService } from "../../services/author/author.service";
import { changeAuthorData, changeAuthorDataFailed, changeAuthorDataSuccess, loadAllAuthors, loadAllAuthorsSuccess, loadAuthorBooks, loadAuthorBooksFailed, loadAuthorBooksSuccess, loadAuthorByFirstLetter, loadAuthorByFirstLetterSuccess, loadAuthorById, loadAuthorByIdFailed, loadAuthorByIdSuccess, loadBestAuthors, loadBestAuthorsFailed, loadBestAuthorsSuccess } from "./author.actions";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { response } from "express";
import { Store } from "@ngrx/store";
import { selectAllAuthors, selectAuthorById } from "./author.selectors";
import { BookService } from "../../services/book/book.service";
import { AuthorDataDto } from "../../dtos/author-data.dto";
import { loadUserData } from "../user/user.actions";


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
                image: (element.image) ? `${environment.apiUrl}/${element.image}` : 'assets/images/best-author.jpg',
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
                picture: (element.picture) ? `${environment.apiUrl}/${element.picture}` : 'assets/images/best-author.jpg',
                books: [],
                booksCount: element.books?.length
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

  loadAuthorById = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthorById),
      mergeMap(action =>
        this.store.select(selectAuthorById(action.id)).pipe(
          mergeMap(selectedAuthor => {
            if (selectedAuthor) {
              return of(loadAuthorByIdSuccess({ loadedAuthor: selectedAuthor }));
            } else {
              return this.authorService.loadData(action.id).pipe(
                map(author => {
                  author = {
                    ...author,
                    picture: (author.picture) ? `${environment.apiUrl}/${author.picture}` : 'assets/images/best-author.jpg',
                    books: [],
                    booksCount: author.books?.length
                  }
                  return loadAuthorByIdSuccess({loadedAuthor: author })
                }),
                catchError(error => of(loadAuthorByIdFailed({ error: error.message })))
              );
            }
          })
        )
      )
    )
  );

  loadAuthorBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthorBooks),
      mergeMap(action => 
        this.bookService.selectAuthorBooks(action.author_id, action.skip, action.limit).pipe(
          map(response => {
            if (response) {
              const updatedBooks = response.map(element => ({
                ...element,
                image: `${environment.apiUrl}/${element.image}`,
                reviews: element.reviews?.map(review => ({
                  ...review,
                  user: {
                    id: review.user.id,
                    email: review.user.email,
                    created_at: review.user.created_at
                  }
                }))
              }));
              return loadAuthorBooksSuccess({ books: updatedBooks, author_id: action.author_id });
            } else {
              return loadAuthorBooksFailed({ error: "Greška" });
            }
          }),
          catchError(error => of(loadAuthorBooksFailed({ error: error.message })))
        )
      )
    )
  );

  changeAuthorData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeAuthorData),
      mergeMap(action =>
        this.authorService.updateAuthorData(action.author_id, action.authorData).pipe(
          map(response => {
            if (response) {
              return loadUserData({id: action.user_id});
            } else {
              return changeAuthorDataFailed({ error: "Greska" });
            }
          }),
          catchError(error => of(changeAuthorDataFailed({ error })))
        )
      )
    )
  );
  

  constructor(
    private actions$: Actions,
    private authorService: AuthorService,
    private bookService: BookService,
    private store: Store
  ){}
}