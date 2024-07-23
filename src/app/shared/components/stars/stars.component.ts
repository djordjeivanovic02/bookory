import { Component, Input } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-stars",
  templateUrl: "./stars.component.html",
  styleUrl: "./stars.component.scss",
})
export class StarsComponent {
  @Input()
  rate: number = 2;
  @Input()
  showRate: Boolean = true;

  faStar = faStar;
  faStarEmpty = faStarEmpty;
  faHeart = faRegularHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);

  isFullStar(index: number): boolean {
    return index < this.rate;
  }
}
