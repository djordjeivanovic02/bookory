import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-book-widget-3",
  templateUrl: "./book-widget-3.component.html",
  styleUrl: "./book-widget-3.component.scss",
})
export class BookWidget3Component implements OnInit{
  @Input()
  book: BookInfoDto | null = null;
  @Input()
  showRemove: boolean = true;

  @Output()
  bookIdEmmiter = new EventEmitter<{book_id: number, author_id: number}>();
  
  bookAverageRate: number = 0;

  faRemove = faRemove;
  faEdit = faEdit;

  removeBook(book_id: number, author_id: number){
    this.bookIdEmmiter.emit({book_id: book_id, author_id: author_id});
  }

  ngOnInit(): void {
    this.bookAverageRate = this.book?.reviews && this.book.reviews.length > 0 
        ? (this.book.reviews.reduce((sum, review) => sum + review.rate, 0) / this.book.reviews.length)
        : 0;
  }

  constructor(){}
}
