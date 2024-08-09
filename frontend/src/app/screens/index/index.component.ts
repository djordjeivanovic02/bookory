import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectNewestBooks } from '../../shared/store/book/book.selectors';
import { loadNewestBooks } from '../../shared/store/book/book.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  newestBook$: Observable<BookInfoDto[] | undefined | null>;

  constructor(private store: Store){
    this.newestBook$ = this.store.select(selectNewestBooks)
    this.store.dispatch(loadNewestBooks());
  }

  ngOnInit(): void {
    this.newestBook$.subscribe(newestBooks => {
      console.log(newestBooks);
    })
  }
}
