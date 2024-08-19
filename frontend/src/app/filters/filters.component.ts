import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthorDataDto } from '../shared/dtos/author-data.dto';
import { loadCategories } from '../shared/store/book/book.actions';
import { loadAllAuthors } from '../shared/store/author/author.actions';
import { Store } from '@ngrx/store';
import { selectAllCategories, selectAllCategoriesLoaded } from '../shared/store/book/book.selectors';
import { selectAllAuthors, selectAllAuthorsLoaded } from '../shared/store/author/author.selectors';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent  implements OnInit, OnDestroy {

  allCategorie$: Observable<string[] | null>;
  allCategories: string[] | null = null;
  allCategoriesSubscription: Subscription = new Subscription();

  allCategoriesLoaded$: Observable<boolean>;
  allCategoriesLoadedSubscription: Subscription = new Subscription();

  allAuthor$: Observable<AuthorDataDto[] | null>;
  allAuthors: AuthorDataDto[] | null = null;
  allAuthorsSubscription: Subscription = new Subscription();

  allAuthorsLoaded$: Observable<boolean>;
  allAuthorsLoadedSubscription: Subscription = new Subscription();

  selectedCategories: string[] = [];
  selectedAuthors: number[] = [];



  onCategoryChange(event: Event, category: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(!isChecked) this.selectedCategories.filter(element => element !== category);
    else this.selectedCategories.push(category);
    if(this.selectedCategories !== null){
      
    }
  }

  onAuthorChange(event: Event, author_id: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(!isChecked) this.selectedAuthors.filter(element => element !== author_id);
    else this.selectedAuthors.push(author_id);
  }

  ngOnDestroy(): void {
    this.allCategoriesSubscription.unsubscribe();
    this.allCategoriesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.allCategoriesLoadedSubscription = this.allCategoriesLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadCategories());
    });

    this.allCategoriesSubscription = this.allCategorie$.subscribe(categories => this.allCategories = categories);
  
    this.allAuthorsLoadedSubscription = this.allAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadAllAuthors());
    });
    
    this.allAuthorsSubscription = this.allAuthor$.subscribe(allAuthors => {
      this.allAuthors = allAuthors;
    });
  }

  constructor(private store: Store){
    this.allCategoriesLoaded$ = this.store.select(selectAllCategoriesLoaded);
    this.allCategorie$ = this.store.select(selectAllCategories);
  
    this.allAuthor$ = this.store.select(selectAllAuthors);
    this.allAuthorsLoaded$ = this.store.select(selectAllAuthorsLoaded);
  }
}
