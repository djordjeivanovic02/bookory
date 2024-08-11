import { Component, OnInit } from '@angular/core';
import { BookWithSaved } from '../../dtos/book-with-saved.dto';
import { combineLatest, Observable } from 'rxjs';
import { BookInfoDto } from '../../dtos/book-info.dto';
import { UserDataStoreDto } from '../../dtos/user-data.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks, selectNewestBooksLoaded } from '../../store/book/book.selectors';
import { selectUserData } from '../../store/user/user.selectors';
import { loadNewestBooks } from '../../store/book/book.actions';
import { saveBook } from '../../store/user/user.actions';

@Component({
  selector: 'app-newest-list',
  templateUrl: './newest-list.component.html',
  styleUrl: './newest-list.component.scss'
})
export class NewestListComponent implements OnInit {
  newestBooksWithStatus: BookWithSaved[] = [];

  newestBook$: Observable<BookInfoDto[] | undefined | null>;
  newestBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | undefined | null>;
  userData: UserDataStoreDto | null | undefined= null; 

  constructor(private store: Store){
    this.newestBooksLoaded$ = this.store.select(selectNewestBooksLoaded);
    this.newestBook$ = this.store.select(selectNewestBooks);

    this.userData$ = this.store.select(selectUserData);
  }
  
  ngOnInit(): void {
    this.newestBooksLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadNewestBooks());
    });
    this.userData$.subscribe(userData => {
      this.userData = userData;
    });
    combineLatest([this.newestBook$, this.userData$]).subscribe(([books, userData]) =>{
      if(books && userData && userData.savedBooks){
        this.newestBooksWithStatus = books.map(book => {
          const isSaved = userData.savedBooks?.includes(book.id);
          return {...book, isSaved};
        });
      }else if(books){
        this.newestBooksWithStatus = books.map(book => ({...book, isSaved: false}));
      }
    })
  }

  saveBook({ saved, id }: { saved: boolean, id: number }) {
    if(!saved && this.userData){
      this.store.dispatch(saveBook({ 
        user_id: this.userData?.id,
        book_id: id
      }));
    }
  }
}

