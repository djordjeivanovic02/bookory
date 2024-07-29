import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../core/interfaces/navlink.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  faArrowRight = faArrowRight;
  isWriter: Boolean = false;
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];

  toggleWriter(value: Boolean) {
    this.isWriter = value;
  }
}
