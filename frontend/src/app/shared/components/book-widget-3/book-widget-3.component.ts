import { Component } from "@angular/core";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faDeleteLeft, faRemove } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-book-widget-3",
  templateUrl: "./book-widget-3.component.html",
  styleUrl: "./book-widget-3.component.scss",
})
export class BookWidget3Component {
  faRemove = faRemove;
  faEdit = faEdit;
}
