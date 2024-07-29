import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { clientDashboardActions } from "../../shared/local-lists/client-dashboard-actions";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrl: "./client-dashboard.component.scss",
})
export class ClientDashboardComponent {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  actions = clientDashboardActions;
  selectedContainer = 2;

  showContainer(index: number, event: Event) {
    event.preventDefault();
    this.selectedContainer = index;
  }
}
