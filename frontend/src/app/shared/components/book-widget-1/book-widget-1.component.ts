import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { BookWithSaved } from "../../dtos/book-with-saved.dto";
@Component({
  selector: "app-book-widget-1",
  templateUrl: "./book-widget-1.component.html",
  styleUrl: "./book-widget-1.component.scss",
})
export class BookWidget1Component implements OnInit {
  faStar = faStar;
  faHeart = faRegularHeart;
  faHeartFill = faHeart;
  stars = Array(5)
    .fill(0)
    .map((x, i) => i);

  @Input()
  book: BookWithSaved | null = null;

  bookAverageRate: number = 0;

  @Output()
  saveTrigger = new EventEmitter<{saved: boolean, id: number}>();

  saveChange(value: boolean | undefined){
    this.saveTrigger.emit({saved: value ? value : false, id: this.book?.id ? this.book.id : -1});
  }

  ngOnInit(): void {
    this.bookAverageRate = this.book?.reviews && this.book.reviews.length > 0 
        ? (this.book.reviews.reduce((sum, review) => sum + review.rate, 0) / this.book.reviews.length)
        : 0;
  }
}
