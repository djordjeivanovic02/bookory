import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faClose,
  faList,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { loadAllBooks, loadAuthorsByCategories, loadCategories } from "../../shared/store/book/book.actions";
import { selectAllCategories, selectAllCategoriesLoaded } from "../../shared/store/book/book.selectors";
import { selectAllAuthors, selectAllAuthorsLoaded } from "../../shared/store/author/author.selectors";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { loadAllAuthors } from "../../shared/store/author/author.actions";
import { FilterDto } from "../../shared/dtos/filter.dto";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrl: "./shop.component.scss",
})
export class ShopComponent implements OnInit, OnDestroy {
  links: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];

  faList = faList;
  faTable = faTable;
  faClose = faClose;

  filters: FilterDto | null = null;
  
  allCategories$: Observable<string[] | null>;
  allCategories: string[] | null = null;
  allCategoriesSubscription: Subscription = new Subscription();

  allCategoriesLoaded$: Observable<boolean | null>;
  allCategoriesLoadedSubscription: Subscription = new Subscription();

  setFilters(filters: FilterDto | null){
    this.filters = filters;
  }

  removeFilters(event: Event){
    event.preventDefault();
    this.filters = {
      categories: [],
      authors: [],
      skip: 0,
      limit: 2,
      sort: 0
    }
    this.store.dispatch(loadAllBooks({filters: this.filters!, reset: true}));
  }

  isFilters(): boolean {
    return !!this.filters && 
           (this.filters.authors?.length > 0 || this.filters.categories?.length > 0);
  }

  onLimitChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if(this.filters){
      this.filters = {
        ...this.filters,
        skip: 0,
        limit: parseInt(selectedValue)
      };
    }
    this.store.dispatch(loadAllBooks({filters: this.filters!, reset: true}));
  }
  
  chceckShowSelected(value: number): boolean{
    return this.filters?.limit === value;
  }

  ngOnInit(): void {
    this.allCategoriesLoadedSubscription = this.allCategoriesLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadCategories());
    });
    this.allCategoriesSubscription = this.allCategories$.subscribe(categories => {
      this.allCategories = categories;
    });
  }

  ngOnDestroy(): void {
    this.allCategoriesLoadedSubscription.unsubscribe();
    this.allCategoriesSubscription.unsubscribe();
  }
  
  constructor(private store: Store){
    this.allCategories$ = this.store.select(selectAllCategories);
    this.allCategoriesLoaded$ = this.store.select(selectAllCategoriesLoaded);
  }
}
