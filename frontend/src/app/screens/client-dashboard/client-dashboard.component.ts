import { Component, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { clientDashboardActions } from "../../shared/local-lists/client-dashboard-actions";
import { Store } from "@ngrx/store";
import { logout } from "../../shared/store/auth/auth.actions";
import { Observable } from "rxjs";
import { selectAuthSuccess } from "../../shared/store/auth/auth.selectores";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrl: "./client-dashboard.component.scss",
})
export class ClientDashboardComponent implements OnInit {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  actions = clientDashboardActions;
  selectedContainer = 0;
  userData$: Observable<any>;

  showContainer(index: number, event: Event) {
    event.preventDefault();
    this.selectedContainer = index;
  }

  logout(){
    this.store.dispatch(logout());
  }

  constructor(private store: Store){
    this.userData$ = this.store.select(selectAuthSuccess);
  }

  ngOnInit(): void {
    this.userData$.subscribe(userData =>
      console.log('User Data: ', userData)
    );
  }
}
