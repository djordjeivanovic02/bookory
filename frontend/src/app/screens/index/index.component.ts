import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks, selectNewestBooksLoaded } from '../../shared/store/book/book.selectors';
import { loadNewestBooks } from '../../shared/store/book/book.actions';
import { AuthorDataDto } from '../../shared/dtos/author-data.dto';
import { BookWithSaved } from '../../shared/dtos/book-with-saved.dto';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { loadUserData } from '../../shared/store/user/user.actions';
import { selectUserData } from '../../shared/store/user/user.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  newestBooksWithStatus: BookWithSaved[] = [];

  newestBook$: Observable<BookInfoDto[] | undefined | null>;
  newestBooksLoaded$: Observable<boolean>;

  userData$: Observable<UserDataStoreDto | undefined | null>;

  constructor(private store: Store){
    this.newestBooksLoaded$ = this.store.select(selectNewestBooksLoaded);
    this.newestBook$ = this.store.select(selectNewestBooks);

    this.userData$ = this.store.select(selectUserData);
  }
  
  ngOnInit(): void {
    this.newestBooksLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadNewestBooks());
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
}
