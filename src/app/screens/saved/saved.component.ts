import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrl: "./saved.component.scss",
})
export class SavedComponent {
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
}
