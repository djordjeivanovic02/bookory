import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrl: "./book.component.scss",
})
export class BookComponent {
  navLinks: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
}
