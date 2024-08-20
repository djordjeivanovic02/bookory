import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { clientDashboardActions } from "../../shared/local-lists/client-dashboard-actions";
import { Store } from "@ngrx/store";
import { logout } from "../../shared/store/auth/auth.actions";
import { Observable, Subscription } from "rxjs";
import { selectAuthSuccess } from "../../shared/store/auth/auth.selectores";
import { UserDataDto, UserDataStoreDto } from "../../shared/dtos/user-data.dto";
import { selectUserData } from "../../shared/store/user/user.selectors";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrl: "./client-dashboard.component.scss",
})
export class ClientDashboardComponent implements OnInit, OnDestroy {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  headerText: string = "Kontrolna Tabla";
  currentLink: string = "Kontrolna Tabla";

  actions = clientDashboardActions;
  selectedContainer = 0;
  userData$: Observable<UserDataStoreDto | undefined | null>;
  userDataSubscription: Subscription = new Subscription();


  showContainer(index: number, event: Event) {
    event.preventDefault();
    this.router.navigate(['/client-dashboard', index]);
  }

  logout(){
    this.store.dispatch(logout());
  }

  updateHeaderText(index: number){
    this.headerText = this.currentLink = clientDashboardActions[index].name;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const containerIndex = +params['id'];
      if (!isNaN(containerIndex)) {
        this.selectedContainer = containerIndex;
        this.updateHeaderText(containerIndex);
      }
    });
  }
  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
  
  constructor(private store: Store, private route: ActivatedRoute, private router: Router){
    this.userData$ = this.store.select(selectUserData);
  }

}
