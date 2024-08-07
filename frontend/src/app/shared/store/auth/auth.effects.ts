import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from "../../services/auth/auth.service";
import { login, loginFailure, loginSuccess, setToken } from "./auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService
    ){}

    login$ = createEffect(() =>
        this.actions$.pipe(
          ofType(login),
          mergeMap(action =>
            this.authService.login(action.username, action.password).pipe(
              map(result => loginSuccess({ token: result.token })),
              catchError(error => of(loginFailure({ error: error.message })))
            )
          )
        )
      );
}