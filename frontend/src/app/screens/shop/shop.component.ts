import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faClose,
  faList,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { loadCategories } from "../../shared/store/book/book.actions";
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

  allAuthor$: Observable<AuthorDataDto[] | null>;
  allAuthors: AuthorDataDto[] | null = null;
  allAuthorsSubscription: Subscription = new Subscription();

  allAuthorsLoaded$: Observable<boolean | null>;
  allAuthorsLoadedSubscription: Subscription = new Subscription();

  setFilters(filters: FilterDto | null){
    this.filters = filters;
    console.log(this.filters);
  }

  ngOnInit(): void {
    this.allCategoriesLoadedSubscription = this.allCategoriesLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadCategories());
    });
    this.allCategoriesSubscription = this.allCategories$.subscribe(categories => {
      this.allCategories = categories;
    });

    this.allAuthorsLoadedSubscription = this.allAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadAllAuthors());
    });
    this.allAuthorsSubscription = this.allAuthor$.subscribe(authors => {
      this.allAuthors = authors;
    })
  }

  ngOnDestroy(): void {
    this.allCategoriesLoadedSubscription.unsubscribe();
    this.allAuthorsLoadedSubscription.unsubscribe();
    this.allAuthorsSubscription.unsubscribe();
  }
  
  constructor(private store: Store){
    this.allCategories$ = this.store.select(selectAllCategories);
    this.allCategoriesLoaded$ = this.store.select(selectAllCategoriesLoaded);

    this.allAuthor$ = this.store.select(selectAllAuthors);
    this.allAuthorsLoaded$ = this.store.select(selectAllAuthorsLoaded);
  }
}
