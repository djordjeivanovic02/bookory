import { Component, OnInit } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { DownloadDto } from "../../shared/dtos/downloaded-book.dto";
import { combineLatest, Observable } from "rxjs";
import { UserDataStoreDto } from "../../shared/dtos/user-data.dto";
import { selectDownloadedBookLimit, selectDownloadedBooks, selectDownloadedBookSkip, selectDownloadedBooksLoaded } from "../../shared/store/book/book.selectors";
import { selectUserData } from "../../shared/store/user/user.selectors";
import { loadDownloadedBooks } from "../../shared/store/book/book.actions";

@Component({
  selector: "app-client-downloads-part",
  templateUrl: "./client-downloads-part.component.html",
  styleUrl: "./client-downloads-part.component.scss",
})
export class ClientDownloadsPartComponent implements OnInit {
  faDownload = faDownload;

  skip: number = 0;
  limit: number = 2;
  skip$: Observable<number>;
  limit$: Observable<number>;

  showLoadMore: boolean = false;

  downloadedBooks: DownloadDto[] | null = [];

  downloadedBook$: Observable<DownloadDto[] | null>;
  downloadedBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | null>;
  userData: UserDataStoreDto | null = null;

  loadMore() {
    if (this.userData) {
      this.store.dispatch(loadDownloadedBooks({ user_id: this.userData.id, skip: this.skip, limit: this.limit }));
    }
  }

  checkShowLoadMore() {
    if (this.userData?.downloadedBooks && this.downloadedBooks) {
      this.showLoadMore = this.userData.downloadedBooks.length > this.downloadedBooks.length;
    } else {
      this.showLoadMore = false;
    }
  }

  ngOnInit(): void {
    combineLatest([
      this.userData$,
      this.downloadedBooksLoaded$,
      this.skip$,
      this.limit$,
    ]).subscribe(([userData, loaded, skip, limit]) => {
      if(skip) this.skip = skip;
      if(limit) this.limit = limit;
      if(userData) this.userData = userData;
      console.log(userData, loaded, skip, limit);
      if (userData && !loaded && skip!==null && limit) {
        this.store.dispatch(loadDownloadedBooks({ user_id: userData.id, skip: skip, limit: limit }));
      }
    });

    this.downloadedBook$.subscribe((downloadedBooks) => {
      if (downloadedBooks) {
        this.downloadedBooks = downloadedBooks.map(element => {
          const formattedDate = new Date(element.created_at).toLocaleDateString('sr-Latn-RS', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).replace(/\.$/, '');
          return {
            ...element,
            formattedDate: formattedDate
          };
        });
      } else {
        this.downloadedBooks = null;
      }
      this.checkShowLoadMore();
    });
  }


  constructor(private store: Store) {
    this.downloadedBook$ = this.store.select(selectDownloadedBooks);
    this.downloadedBooksLoaded$ = this.store.select(selectDownloadedBooksLoaded);
    this.userData$ = this.store.select(selectUserData);
    this.skip$ = this.store.select(selectDownloadedBookSkip);
    this.limit$ = this.store.select(selectDownloadedBookLimit);
  }
}
