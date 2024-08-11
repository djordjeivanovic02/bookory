import { Component, OnInit } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { loadSavedBookData } from "../../store/book/book.actions";
import { combineLatest, Observable } from "rxjs";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { selectSavedBooksData, selectSavedBooksDataLoaded } from "../../store/book/book.selectors";
import { UserDataStoreDto } from "../../dtos/user-data.dto";
import { selectUserData } from "../../store/user/user.selectors";
import { SavedDto } from "../../dtos/saved.dto";

@Component({
  selector: "app-saved-list",
  templateUrl: "./saved-list.component.html",
  styleUrl: "./saved-list.component.scss",
})
export class SavedListComponent implements OnInit {
  faDownload = faDownload;
  

  savedBooks: BookInfoDto[] | undefined | null = [];

  savedBook$: Observable<BookInfoDto[] | undefined | null>;
  savedBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | undefined | null>;
  userData: UserDataStoreDto | null | undefined= null; 

  ngOnInit(): void {
    combineLatest([this.userData$, this.savedBooksLoaded$]).subscribe(([userData, loaded]) =>{
      if(userData && !loaded){
          this.store.dispatch(loadSavedBookData({user_id: userData.id, page: 1, limit: 10}));
      }
    })

    this.savedBook$.subscribe(savedBooks => {
      this.savedBooks = savedBooks;
      console.log("Sacuvane: ", this.savedBooks);
    })
  }

  constructor(private store: Store){
    this.savedBook$ = this.store.select(selectSavedBooksData);
    this.savedBooksLoaded$ = this.store.select(selectSavedBooksDataLoaded);

    this.userData$ = this.store.select(selectUserData);
  }
}
