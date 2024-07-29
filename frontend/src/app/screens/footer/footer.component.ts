import { Component } from "@angular/core";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faLinkedin = faLinkedinIn;
}
