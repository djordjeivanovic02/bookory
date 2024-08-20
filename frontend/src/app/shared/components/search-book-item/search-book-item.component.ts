import { Component, Input } from '@angular/core';
import { BookInfoDto } from '../../dtos/book-info.dto';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-book-item',
  templateUrl: './search-book-item.component.html',
  styleUrl: './search-book-item.component.scss'
})
export class SearchBookItemComponent {
  @Input()
  book: BookInfoDto | null = null;


  bookAverageRate: number = 0;
  imageUrl: string | null = null;

  ngOnInit(): void {
    this.bookAverageRate = this.book?.reviews && this.book.reviews.length > 0 
        ? (this.book.reviews.reduce((sum, review) => sum + review.rate, 0) / this.book.reviews.length)
        : 0;

    if(this.book && this.book){
      this.imageUrl = `${environment.apiUrl}/${this.book.image}`;
    }
  }
}
