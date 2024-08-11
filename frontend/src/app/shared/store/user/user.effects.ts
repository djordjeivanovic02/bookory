import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user/user.service";
import { loadUserData, loadUserDataFailure, loadUserDataSuccess } from "./user.actions";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { LocalstorageService } from "../../services/localstorage/localstorage.service";
import { AuthService } from "../../services/auth/auth.service";
import { UserDataDto, UserDataStoreDto } from "../../dtos/user-data.dto";

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

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalstorageService
  ){}
}