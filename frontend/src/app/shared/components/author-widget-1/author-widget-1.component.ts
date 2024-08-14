import { Component, Input } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { BestAuthorsDto } from "../../dtos/best-authors.dto";

@Component({
  selector: "app-author-widget-1",
  templateUrl: "./author-widget-1.component.html",
  styleUrl: "./author-widget-1.component.scss",
})
export class AuthorWidget1Component {
  @Input()
  bestAuthor: BestAuthorsDto | null = null;
  @Input()
  index: number = 1;

  faStar = faStar;
  faHeart = faRegularHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);

  getRoundedRating(rating: number): number {
    return  Math.round(rating * 100) / 100;
  }
}
