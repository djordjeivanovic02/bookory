import { Component } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  faArrowRight = faArrowRight;
}
