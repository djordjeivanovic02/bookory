import { Component } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-author-widget-1",
  templateUrl: "./author-widget-1.component.html",
  styleUrl: "./author-widget-1.component.scss",
})
export class AuthorWidget1Component {
  faStar = faStar;
  faHeart = faRegularHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);
}
