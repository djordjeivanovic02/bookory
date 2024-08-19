import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FilterDto } from '../../dtos/filter.dto';
import { selectAllCategories, selectFilters, selectFiltersLoaded } from '../../store/book/book.selectors';
import { loadAllBooks, loadCategories, loadFilters } from '../../store/book/book.actions';
import { AuthorDataDto } from '../../dtos/author-data.dto';
import { selectAllAuthorsLoaded } from '../../store/author/author.selectors';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent  implements OnInit, OnDestroy {
  @Input()
  allCategories: string[] | null = null;
  @Input()
  allAuthors: AuthorDataDto[] | null = null;
  @Output()
  filtersEmmiter = new EventEmitter<FilterDto | null>();

  $filters: Observable<FilterDto | null>;
  filters: FilterDto | null = null;
  filtersSubscription: Subscription = new Subscription();

  $filtersLoaded$: Observable<boolean | null>;
  filtersLoadedSubscription: Subscription = new Subscription();

  onCategoriesChange(categorie: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (this.filters && this.filters.categories) {
      let updatedCategories = [...this.filters.categories];

      if (isChecked) {
          if (updatedCategories.indexOf(categorie) === -1) {
              updatedCategories.push(categorie);
          }
      } else {
          updatedCategories = updatedCategories.filter(element => element !== categorie);
      }

      this.filters = {
          ...this.filters,
          skip: 0,
          categories: updatedCategories
      };
    }
    if(this.filters){
      this.filtersEmmiter.emit(this.filters);
      this.store.dispatch(loadAllBooks({filters: this.filters!, reset: true}));
    }
  }


  ngOnInit(): void {
    this.filtersLoadedSubscription = this.$filtersLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadFilters());
    });
    this.filtersSubscription = this.$filters.subscribe(element => {
      this.filters = element;
      this.filtersEmmiter.emit(this.filters);
    });
  }

  ngOnDestroy(): void {
    this.filtersLoadedSubscription.unsubscribe();
    this.filtersSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.$filtersLoaded$ = this.store.select(selectFiltersLoaded);
    this.$filters = this.store.select(selectFilters);
  }
}
