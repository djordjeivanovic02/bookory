import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BookInfoDto } from "../../shared/dtos/book-info.dto";
import { Store } from "@ngrx/store";
import { selectBook } from "../../shared/store/book/book.actions";
import { selectBookById } from "../../shared/store/book/book.selectors";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrl: "./book.component.scss",
})
export class BookComponent implements OnInit{
  navLinks: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  faDownload = faDownload;
  faHeart = faHeart;

  bookId: number | null= null;
  showingDescription: Boolean = true;

  bookInfo$: Observable<BookInfoDto | null>;
  bookInfo: BookInfoDto | null = null;
  averageRate: number | null = null;

  toggleShowing(value: Boolean) {
    this.showingDescription = value;
  }

  getAverageRate(): number{
    if (this.bookInfo?.reviews && this.bookInfo.reviews.length > 0) {
      const totalRating = this.bookInfo.reviews.reduce((acc, review) => acc + review.rate, 0);
      console.log(totalRating);
      return totalRating / this.bookInfo.reviews.length;
    }
    return 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.bookId = id ? +id : null;
      if (this.bookId) {
        this.store.dispatch(selectBook({ id: this.bookId }));
      }
    });
    
    this.bookInfo$.subscribe(book => {
      if(book){
        this.bookInfo = book;
        this.averageRate = this.getAverageRate();
      }else{
        this.bookInfo = null;
        this.averageRate = null;
      }
    })
  }
  
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){
    this.bookInfo$ = this.store.select(selectBookById);
  }
}
