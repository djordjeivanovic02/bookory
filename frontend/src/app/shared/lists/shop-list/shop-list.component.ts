import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookInfoDto } from '../../dtos/book-info.dto';
import { selectAllBooks, selectAllBooksCount, selectAllBooksLoaded } from '../../store/book/book.selectors';
import { loadAllBooks } from '../../store/book/book.actions';
import { FilterDto } from '../../dtos/filter.dto';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent implements OnInit, OnDestroy{

  filteredBook$: Observable<BookInfoDto[] | null>;
  filteredBooks: BookInfoDto[] | null = null;
  filteredBooksSubscription: Subscription = new Subscription();

  filteredBooksLoaded$: Observable<boolean | null>;
  filteredBooksLoadedSubscription: Subscription = new Subscription();

  filteredBooksCount$: Observable<number | null>;
  filteredBooksCount: number | null = null;
  filteredBooksCountSubscription: Subscription = new Subscription();
  
  @Input()
  filters: FilterDto | null = null;

  @Input()
  showType: number = 0;

  loadMore() {
    if(this.filteredBooks && this.filteredBooksCount && this.filters){
      this.store.dispatch(loadAllBooks({filters: this.filters, reset: false}));
    }
  }

  showLoadMore(): boolean {
    if(this.filteredBooks && this.filteredBooksCount)
      return this.filteredBooksCount > this.filteredBooks.length;
    return false;
  }

  ngOnInit(): void {
    this.filteredBooksLoaded$.subscribe(loaded => {
      if(!loaded && this.filters) this.store.dispatch(loadAllBooks({filters: this.filters, reset: false}));
    })

    this.filteredBook$.subscribe(books => this.filteredBooks = books);
    this.filteredBooksCount$.subscribe(counts => this.filteredBooksCount = counts);
  }

  ngOnDestroy(): void {
    this.filteredBooksLoadedSubscription.unsubscribe();
    this.filteredBooksSubscription.unsubscribe();
    this.filteredBooksCountSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.filteredBook$ = this.store.select(selectAllBooks);
    this.filteredBooksLoaded$ = this.store.select(selectAllBooksLoaded);
    this.filteredBooksCount$ = this.store.select(selectAllBooksCount);
  }
}
