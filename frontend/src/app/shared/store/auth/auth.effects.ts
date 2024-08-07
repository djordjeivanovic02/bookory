import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from "../../services/auth/auth.service";
import { login, loginFailure, loginSuccess, logout, registerFailure, registerr, registerSuccess } from "./auth.actions";
import { catchError, filter, map, mergeMap, of, tap } from "rxjs";
import { LocalstorageService } from "../../services/localstorage/localstorage.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(response => {
            const { token } = response; 
            return loginSuccess({ token });
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(action => {
        this.localStorageService.setItem('authToken', action.token);
        // this.router.navigate(['/dashboard']);
      })
    ), { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailure),
      tap(({ error }) => {

      })
    ), { dispatch: false }
  );

  loadToken$ = createEffect(() =>
    of(this.localStorageService.getItem('authToken')).pipe(
      filter(token => !!token),
      map(token => {
        if (this.authService.isValidToken(token!)) {
          const user = this.authService.getUserFromToken(token!);
          return loginSuccess({ token: token! });
        } else {
          return logout();
        }
      })
    )
  );

  
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerr),
      mergeMap(action =>
        this.authService.register(action.name, action.surname, action.email, action.password).pipe(
          map(response => {
            const { token, user } = response.data; 
            this.localStorageService.setItem('authToken', token);
            return registerSuccess({ token });
          }),
          catchError(error => of(registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccess),
      tap(action => {
        this.router.navigate(['/dashboard']);
      })
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.localStorageService.removeItem('authToken');
        this.router.navigate(['/']);
      })
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router,
    private store: Store
  ) {}
}