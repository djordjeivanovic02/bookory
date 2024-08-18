import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { Observable, Subscription } from 'rxjs';
import { BookInfoDto } from '../../shared/dtos/book-info.dto';
import { Store } from '@ngrx/store';
import { selectMyBooks, selectMyBooksCount, selectMyBooksCountLoaded, selectMyBooksLoaded } from '../../shared/store/author/author.selectors';
import { loadMyBooks, loadMyBooksCount } from '../../shared/store/author/author.actions';

@Component({
  selector: 'app-author-my-books',
  templateUrl: './author-my-books.component.html',
  styleUrl: './author-my-books.component.scss'
})
export class AuthorMyBooksComponent implements OnInit, OnDestroy {
  @Input()
  userData: UserDataStoreDto | null = null;

  myBook$: Observable<BookInfoDto[] | null>;
  myBooks: BookInfoDto[] | null = null;
  myBooksSubscription: Subscription = new Subscription();

  myBooksLoaded$: Observable<boolean | null>;
  myBooksLoadedSubscription: Subscription = new Subscription();

  myBooksCount$: Observable<number | null>;
  myBookCount: number | null = null;
  myBooksCountSubscription: Subscription = new Subscription();

  myBooksCountLoaded$: Observable<boolean | null>;
  myBooksCountLoadedSubscription: Subscription = new Subscription();

  limit: number = 2;

  showMoreButton: boolean = true;

  checkShowMoreButton() {
    if(this.myBooks && this.myBookCount)
      this.showMoreButton = this.myBookCount > this.myBooks?.length;
  }

  loadMore(){
    if(this.userData?.author){
      this.store.dispatch(loadMyBooks({author_id: this.userData.author?.id, skip: this.myBooks?.length || 0, limit: this.limit}));
    }
  }

  ngOnInit(): void {
    this.myBooksLoadedSubscription = this.myBooksLoaded$.subscribe(loaded => {
      if(!loaded && this.userData?.author) this.store.dispatch(loadMyBooks({author_id: this.userData?.author?.id, skip: this.myBooks?.length || 0, limit: this.limit}));
    })
    this.myBooksCountLoadedSubscription = this.myBooksCountLoaded$.subscribe(loaded => {
      if(!loaded && this.userData?.author) this.store.dispatch(loadMyBooksCount({author_id: this.userData.author.id}));
    })

    this.myBooksLoadedSubscription = this.myBook$.subscribe(books => {
      if(books){
        this.myBooks = books;
      }
    });
    this.myBooksSubscription = this.myBook$.subscribe(books => {
      if (books) {
        this.myBooks = books;
        this.checkShowMoreButton();
      }
    });

    this.myBooksCountSubscription = this.myBooksCount$.subscribe(count => {
      if (count !== null) {
        this.myBookCount = count;
        this.checkShowMoreButton();
      }
    });
  }

  ngOnDestroy(): void {
    this.myBooksSubscription.unsubscribe();
    this.myBooksLoadedSubscription.unsubscribe();
    this.myBooksCountSubscription.unsubscribe();
    this.myBooksCountLoadedSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.myBook$ = this.store.select(selectMyBooks);
    this.myBooksLoaded$ = this.store.select(selectMyBooksLoaded);
    this.myBooksCount$ = this.store.select(selectMyBooksCount);
    this.myBooksCountLoaded$ = this.store.select(selectMyBooksCountLoaded);
  }
}
