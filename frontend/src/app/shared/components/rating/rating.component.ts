import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrl: "./rating.component.scss",
})
export class RatingComponent {
  @Output()
  rateEmitter = new EventEmitter<number>();

  maxStars = 5;
  rating = 0;
  isRatingSet = false;
  hoveredStar: number | null = null;

  setRating(star: number) {
    this.hoveredStar = null;
    this.rating = star;
    this.isRatingSet = true;
    this.rateEmitter.emit(this.rating);
  }

  isStarSelected(star: number) {
    return this.rating >= star;
  }

  isStarHovered(star: number) {
    return this.hoveredStar !== null && star <= this.hoveredStar;
  }

  hoverStar(star: number) {
    if (!this.isRatingSet) {
      this.hoveredStar = star;
    }
  }

  unhoverStar() {
    if (!this.isRatingSet) {
      this.hoveredStar = null;
    }
  }
}
