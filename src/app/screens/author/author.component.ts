import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faFacebook,
  faFacebookF,
  faFacebookMessenger,
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrl: "./author.component.scss",
})
export class AuthorComponent {
  navLinks: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
    {
      name: "House of Sky and Breath",
      route: "/book",
    },
  ];
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faLinkedin = faLinkedinIn;
}
