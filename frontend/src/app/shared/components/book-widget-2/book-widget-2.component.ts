import { Component, Input, OnInit } from '@angular/core';
import { BookInfoDto } from '../../dtos/book-info.dto';

@Component({
  selector: 'app-book-widget-2',
  templateUrl: './book-widget-2.component.html',
  styleUrl: './book-widget-2.component.scss'
})
export class BookWidget2Component implements OnInit {
  @Input()
  book: BookInfoDto | null = null;

  bookAverageRate: number = 0;

  ngOnInit(): void {
    console.log("Book: ", this.book);
    this.bookAverageRate = this.book?.reviews && this.book.reviews.length > 0 
        ? (this.book.reviews.reduce((sum, review) => sum + review.rate, 0) / this.book.reviews.length)
        : 0;
  }
}
