import { Component, Input } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../../core/interfaces/navlink.interface";

@Component({
  selector: "app-links-nav",
  templateUrl: "./links-nav.component.html",
  styleUrl: "./links-nav.component.scss",
})
export class LinksNavComponent {
  faArrowRight = faArrowRight;

  @Input()
  links: NavLink[] = [];
  @Input()
  currentLink: string = "";
}
