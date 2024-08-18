import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { authorDashboardActions } from "../../shared/local-lists/author-dashboard-actions";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOut, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { Observable, Subscription } from "rxjs";
import { UserDataStoreDto } from "../../shared/dtos/user-data.dto";
import { Store } from "@ngrx/store";
import { selectUserData } from "../../shared/store/user/user.selectors";

@Component({
  selector: "app-author-dashboard",
  templateUrl: "./author-dashboard.component.html",
  styleUrl: "./author-dashboard.component.scss",
})
export class AuthorDashboardComponent implements OnInit, OnDestroy {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  faUser = faUser;
  faShutdown = faSignOut;

  actions = authorDashboardActions;
  selectedContainer = 1;

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;
  private userDataSubscription: Subscription = new Subscription();

  showContainer(index: number, event: Event) {
    event.preventDefault();
    this.selectedContainer = index;
  }
  
  ngOnInit(): void {
    this.userDataSubscription = this.userData$.subscribe(userData => this.userData = userData);
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.userData$ = this.store.select(selectUserData);
  }
}
