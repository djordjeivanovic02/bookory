import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks, selectNewestBooksLoaded, selectSavedBooks, selectSavedBooksLoaded } from '../../shared/store/book/book.selectors';
import { loadNewestBooks } from '../../shared/store/book/book.actions';
import { AuthorDataDto } from '../../shared/dtos/author-data.dto';
import { BookWithSaved } from '../../shared/dtos/book-with-saved.dto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  newestBooksWithStatus: BookWithSaved[] | undefined = [];

  newestBook$: Observable<BookInfoDto[] | undefined | null>;
  newestBooksLoaded$: Observable<boolean>;

  savedBooks$: Observable<number[] | null>;

  constructor(private store: Store){
    this.newestBooksLoaded$ = this.store.select(selectNewestBooksLoaded);
    this.newestBook$ = this.store.select(selectNewestBooks);

    this.savedBooks$ = this.store.select(selectSavedBooks);
  }
  
  ngOnInit(): void {
    this.newestBooksLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadNewestBooks());
    });

    this.newestBook$.subscribe(newestBooks => {
      this.savedBooks$.subscribe(saved => {
        this.newestBooksWithStatus = newestBooks?.map(book => ({
          ...book,
          isSaved: saved?.some(savedBook => savedBook === book.id)
        }))
        console.log(this.newestBooksWithStatus);
      })
    })
  }
}
