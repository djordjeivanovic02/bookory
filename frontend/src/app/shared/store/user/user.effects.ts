import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user/user.service";
import { loadUserData, loadUserDataFailure, loadUserDataSuccess, removeSavedBook, removeSavedBookFailed, removeSavedBookSuccess, saveBook, saveBookFailed, saveBookSuccess } from "./user.actions";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { LocalstorageService } from "../../services/localstorage/localstorage.service";
import { AuthService } from "../../services/auth/auth.service";
import { UserDataDto, UserDataStoreDto } from "../../dtos/user-data.dto";
import { BookService } from "../../services/book/book.service";

@Injectable()
export class UserEffects {

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap(action => 
        this.userService.loadData(action.id).pipe(
          map(response => {
            if (response) {
              const user: UserDataStoreDto = {
                id: response.id,
                email: response.email,
                created_at: response.created_at,
                author: response.author,
                savedBooks: response.savedBooks? response.savedBooks.map(element => element.book.id) : []
              }
              return loadUserDataSuccess({ user: user });
            } else {
              return loadUserDataFailure({ error: "Greška" });
            }
          }),
          catchError(error => of(loadUserDataFailure({ error })))
        )
      )
    )
  );

  checkAuthToken$ = createEffect(() =>
    of(this.localStorageService.getItem('authToken')).pipe(
      mergeMap(token => {
        if (token && this.authService.isValidToken(token)) {
          const userId = this.authService.getUserFromToken(token).id;
          return of(loadUserData({ id: userId }));
        } else {
          return of();
        }
      })
    )
  );



  saveBook = createEffect(() => 
    this.actions$.pipe(
      ofType(saveBook),
      mergeMap(action => 
        this.bookService.saveBook(action.user_id, action.book_id).pipe(
          map(response => {
            if(response){
              return saveBookSuccess({savedBook: response})
            }else{
              return saveBookFailed({error: "Greska"})
            }
          }),
          catchError(error => of(saveBookFailed({error})))
        )
      )
    )
  );

  removeSavedBook = createEffect(() => 
    this.actions$.pipe(
      ofType(removeSavedBook),
      mergeMap(action => 
        this.bookService.removeSavedBook(action.user_id, action.book_id).pipe(
          map(response => {
            if(response){
              return removeSavedBookSuccess({book_id: action.book_id})
            }else{
              return removeSavedBookFailed({error: "Greska"})
            }
          }),
          catchError(error => of(removeSavedBookFailed({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private bookService: BookService,
    private localStorageService: LocalstorageService
  ){}
}