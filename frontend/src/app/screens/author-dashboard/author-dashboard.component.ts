import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { authorDashboardActions } from "../../shared/local-lists/author-dashboard-actions";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOut, faTurnDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-author-dashboard",
  templateUrl: "./author-dashboard.component.html",
  styleUrl: "./author-dashboard.component.scss",
})
export class AuthorDashboardComponent {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  faUser = faUser;
  faShutdown = faSignOut;

  actions = authorDashboardActions;
  selectedContainer = 3;

  showContainer(index: number, event: Event) {
    event.preventDefault();
    this.selectedContainer = index;
  }
}
