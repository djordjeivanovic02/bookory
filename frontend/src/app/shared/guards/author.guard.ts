import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AuthService } from "../services/auth/auth.service";
import { catchError, map, Observable, of, switchMap, take } from "rxjs";
import { selectToken } from "../store/auth/auth.selectores";
import { UserService } from "../services/user/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorGuard implements CanActivate {
    constructor(
        private store: Store,
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return this.store.pipe(
            select(selectToken),
            take(1),
            switchMap(token => {
                console.log(token);
                if (token && this.authService.isValidToken(token)) {
                    const tokenData = this.authService.getUserFromToken(token);
                    return this.userService.loadData(tokenData.id).pipe(
                        map(user => {
                            if (user && user.author) {
                                return true;
                            } else {
                                this.router.navigate(['/']);
                                return false;
                            }
                        })
                    );
                } else {
                    this.router.navigate(['/']);
                    return of(false);
                }
            })
        );
    }
}