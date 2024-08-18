import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { selectAllAuthors, selectAllAuthorsLoaded, selectAuthorsByFirstLetter } from "../../shared/store/author/author.selectors";
import { loadAllAuthors, loadAuthorByFirstLetter } from "../../shared/store/author/author.actions";

@Component({
  selector: "app-all-authors",
  templateUrl: "./all-authors.component.html",
  styleUrl: "./all-authors.component.scss",
})
export class AllAuthorsComponent implements OnInit, OnDestroy{
  selectedLetter: string = "SVI";

  allAuthor$: Observable<AuthorDataDto[] | null>;
  allAuthors: AuthorDataDto[] | null = null;
  allAuthorsSubscription: Subscription = new Subscription();

  allAuthorsLoaded$: Observable<boolean>;
  allAuthorsLoadedSubscription: Subscription = new Subscription();

  filteredAuthor$: Observable<AuthorDataDto[] | null>;
  filteredAuthors: AuthorDataDto[] | null = null;
  filteredAuthorsSubscription: Subscription = new Subscription();

  getAlphabet(): string[] {
    const alphabet = ["SVI"];
    for (let i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(65 + i));
    }
    return alphabet;
  }

  setSelectedLetter(letter: string, event: Event) {
    event.preventDefault();
    this.selectedLetter = letter;
    if(letter !== 'SVI'){
      this.store.dispatch(loadAuthorByFirstLetter({letter: letter}));
    }
  }

  ngOnInit(): void {
    this.allAuthorsLoadedSubscription = this.allAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadAllAuthors());
    });
    
    this.allAuthorsSubscription = this.allAuthor$.subscribe(allAuthors => {
      this.allAuthors = allAuthors;
    });

    this.filteredAuthorsSubscription = this.filteredAuthor$.subscribe(filtered => {
      this.filteredAuthors = filtered;
    });
  }

  ngOnDestroy(): void {
    this.allAuthorsSubscription.unsubscribe();
    this.allAuthorsLoadedSubscription.unsubscribe();
    this.filteredAuthorsSubscription.unsubscribe();
  }

  constructor(private store: Store){
    this.allAuthor$ = this.store.select(selectAllAuthors);
    this.allAuthorsLoaded$ = this.store.select(selectAllAuthorsLoaded);
    this.filteredAuthor$ = this.store.select(selectAuthorsByFirstLetter);
  }

}
