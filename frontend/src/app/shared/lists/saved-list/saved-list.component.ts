import { Component, OnInit } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { addBookToDownloaded, loadSavedBookData, removeBookFromSavedList } from "../../store/book/book.actions";
import { combineLatest, Observable } from "rxjs";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { selectSavedBookLimit, selectSavedBookSkip, selectSavedBooksData, selectSavedBooksDataLoaded } from "../../store/book/book.selectors";
import { UserDataStoreDto } from "../../dtos/user-data.dto";
import { selectUserData } from "../../store/user/user.selectors";
import { BookService } from "../../services/book/book.service";

@Component({
  selector: "app-saved-list",
  templateUrl: "./saved-list.component.html",
  styleUrls: ["./saved-list.component.scss"],
})
export class SavedListComponent implements OnInit {
  faDownload = faDownload;

  skip: number = 0;
  limit: number = 2;
  skip$: Observable<number>;
  limit$: Observable<number>;

  showLoadMore: boolean = false;

  savedBooks: BookInfoDto[] | undefined | null = [];

  savedBook$: Observable<BookInfoDto[] | undefined | null>;
  savedBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;

  loadMore() {
    if (this.userData) {
      this.store.dispatch(loadSavedBookData({ user_id: this.userData.id, skip: this.skip, limit: this.limit }));
    }
  }

  remove(event: Event, bookId: number){
    event.preventDefault();
    if(this.userData){
      this.store.dispatch(removeBookFromSavedList({user_id: this.userData.id, book_id: bookId}))
    }
  }

  checkShowLoadMore() {
    if (this.userData?.savedBooks && this.savedBooks) {
      this.showLoadMore = this.userData.savedBooks.length > this.savedBooks.length;
    } else {
      this.showLoadMore = false;
    }
  }

  downloadPdf(pdf: string, title: string, book_id: number, downloaded: boolean){
    this.bookService.downloadPdf(pdf, title);
    if(this.userData && !downloaded)
      this.store.dispatch(addBookToDownloaded({user_id: this.userData.id, book_id: book_id}));
  }

  updateDownloadedIndicator(savedBooks: BookInfoDto[]){
    this.savedBooks = savedBooks.map(book => {
      const isDownloaded = this.userData!.downloadedBooks?.some(
        downloadedBook => downloadedBook === book.id
      );
      return { ...book, downloaded: isDownloaded || false };
    });
  }

  ngOnInit(): void {
    combineLatest([
      this.userData$,
      this.savedBooksLoaded$,
      this.skip$,
      this.limit$,
    ]).subscribe(([userData, loaded, skip, limit]) => {
      if(skip) this.skip = skip;
      if(limit) this.limit = limit;
      if(userData) this.userData = userData;
      if (userData && !loaded && skip!==null && limit) {
        this.store.dispatch(loadSavedBookData({ user_id: userData.id, skip: skip, limit: limit }));
      }
    });

    this.userData$.subscribe((userData) => {
      this.userData = userData;
      this.updateDownloadedIndicator(this.savedBooks || []);
    });
    
    this.savedBook$.subscribe((savedBooks) => {
      if (savedBooks && this.userData && this.userData.downloadedBooks) {
        this.updateDownloadedIndicator(savedBooks);
      } else {
        this.savedBooks = savedBooks;
      }
      console.log("Books:", this.savedBooks);
      this.checkShowLoadMore();
    });
    
  }


  constructor(private store: Store, private bookService: BookService) {
    this.savedBook$ = this.store.select(selectSavedBooksData);
    this.savedBooksLoaded$ = this.store.select(selectSavedBooksDataLoaded);
    this.userData$ = this.store.select(selectUserData);
    this.skip$ = this.store.select(selectSavedBookSkip);
    this.limit$ = this.store.select(selectSavedBookLimit);
  }
}
