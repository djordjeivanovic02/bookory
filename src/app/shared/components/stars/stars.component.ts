import { Component } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrl: "./stars.component.scss",
})
export class StarsComponent {
  faStar = faStar;
  faHeart = faRegularHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);
}
