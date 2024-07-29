import { Component } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button1",
  templateUrl: "./button1.component.html",
  styleUrl: "./button1.component.scss",
})
export class Button1Component {
  faArrowRight = faArrowRight;
}
