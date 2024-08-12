import { Component, OnInit } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { loadSavedBookData } from "../../store/book/book.actions";
import { combineLatest, Observable } from "rxjs";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { selectSavedBookLimit, selectSavedBookPage, selectSavedBooksData, selectSavedBooksDataLoaded } from "../../store/book/book.selectors";
import { UserDataStoreDto } from "../../dtos/user-data.dto";
import { selectUserData } from "../../store/user/user.selectors";

@Component({
  selector: "app-saved-list",
  templateUrl: "./saved-list.component.html",
  styleUrls: ["./saved-list.component.scss"],
})
export class SavedListComponent implements OnInit {
  faDownload = faDownload;

  page: number = 1;
  limit: number = 2;
  page$: Observable<number>;
  limit$: Observable<number>;

  showLoadMore: boolean = false;

  savedBooks: BookInfoDto[] | undefined | null = [];

  savedBook$: Observable<BookInfoDto[] | undefined | null>;
  savedBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;

  loadMore() {
    if (this.userData) {
      this.store.dispatch(loadSavedBookData({ user_id: this.userData.id, page: this.page, limit: this.limit }));
    }
  }

  ngOnInit(): void {
    combineLatest([
      this.userData$,
      this.savedBooksLoaded$,
      this.page$,
      this.limit$,
    ]).subscribe(([userData, loaded, page, limit]) => {
      if(page)this.page = page;
      if(limit) this.limit = limit;
      if(userData) this.userData = userData;
      if (userData && !loaded && page && limit) {
        this.userData = userData;
        this.page = page;
        this.limit = limit;
        this.store.dispatch(loadSavedBookData({ user_id: userData.id, page: page, limit: limit }));
      }
    });

    this.savedBook$.subscribe((savedBooks) => {
      this.savedBooks = savedBooks;
      this.checkShowLoadMore();
    });
  }

  checkShowLoadMore() {
    if (this.userData?.savedBooks && this.savedBooks) {
      this.showLoadMore = this.userData.savedBooks.length > this.savedBooks.length;
    } else {
      this.showLoadMore = false;
    }
  }

  constructor(private store: Store) {
    this.savedBook$ = this.store.select(selectSavedBooksData);
    this.savedBooksLoaded$ = this.store.select(selectSavedBooksDataLoaded);
    this.userData$ = this.store.select(selectUserData);
    this.page$ = this.store.select(selectSavedBookPage);
    this.limit$ = this.store.select(selectSavedBookLimit);
  }
}
