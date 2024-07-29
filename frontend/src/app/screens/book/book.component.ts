import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
  faDownload = faDownload;
  faHeart = faHeart;

  showingDescription: Boolean = false;

  toggleShowing(value: Boolean) {
    this.showingDescription = value;
  }
}
