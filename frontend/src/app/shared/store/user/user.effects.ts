import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user/user.service";
import { loadUserData, loadUserDataFailure, loadUserDataSuccess } from "./user.actions";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { LocalstorageService } from "../../services/localstorage/localstorage.service";
import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class UserEffects {

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap(action => 
        this.userService.loadData(action.id).pipe(
          map(response => {
            console.log("Response", response);
            if (response) {
              return loadUserDataSuccess({ user: response });
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
        if (token) {
          const userId = this.authService.getUserFromToken(token).id;
          return of(loadUserData({ id: userId })); // Dispatchujemo loadUserData
        } else {
          return of(); // Ne radimo ništa ako token ne postoji
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