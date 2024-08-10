import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks, selectNewestBooksLoaded } from '../../shared/store/book/book.selectors';
import { loadNewestBooks } from '../../shared/store/book/book.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  newestBook$: Observable<BookInfoDto[] | undefined | null>;
  newestBooksLoaded$: Observable<boolean>;

  constructor(private store: Store){
    this.newestBooksLoaded$ = this.store.select(selectNewestBooksLoaded);
    this.newestBook$ = this.store.select(selectNewestBooks)
  }
  
  ngOnInit(): void {
    this.newestBooksLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadNewestBooks());
    });
    
    this.newestBook$.subscribe(newestBooks => {
      console.log("Najnovije knjige:", newestBooks);
    })
  }
}
