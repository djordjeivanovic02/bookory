import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AuthService } from "../services/auth/auth.service";
import { map, Observable, take } from "rxjs";
import { selectToken } from "../store/auth/auth.selectores";

@Injectable({
    providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
    constructor(
        private store: Store,
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return this.store.pipe(
            select(selectToken),
            take(1),
            map(token => {
                if(token && this.authService.isValidToken(token)){
                    this.router.navigate(['/client-dashboard']);
                    return false;
                }
                return false;
            })
        )
    }
}