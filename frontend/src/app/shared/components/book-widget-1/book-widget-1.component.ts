import { Component, Input } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { BookInfoDto } from "../../dtos/book-info.dto";
@Component({
  selector: "app-book-widget-1",
  templateUrl: "./book-widget-1.component.html",
  styleUrl: "./book-widget-1.component.scss",
})
export class BookWidget1Component {
  faStar = faStar;
  faHeart = faRegularHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);

  @Input()
  book: BookInfoDto | null = null;
}
