import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faList,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { selectAllCategories, selectAllCategoriesLoaded } from "../../shared/store/book/book.selectors";
import { loadCategories } from "../../shared/store/book/book.actions";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { selectAllAuthors, selectAllAuthorsLoaded } from "../../shared/store/author/author.selectors";
import { loadAllAuthors } from "../../shared/store/author/author.actions";

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
