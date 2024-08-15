import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { selectAllAuthors, selectAllAuthorsLoaded, selectAuthorsByFirstLetter } from "../../shared/store/author/author.selectors";
import { loadAllAuthors, loadAuthorByFirstLetter } from "../../shared/store/author/author.actions";

@Component({
  selector: "app-all-authors",
  templateUrl: "./all-authors.component.html",
  styleUrl: "./all-authors.component.scss",
})
export class AllAuthorsComponent implements OnInit{
  selectedLetter: string = "SVI";

  allAuthor$: Observable<AuthorDataDto[] | null>;
  allAuthors: AuthorDataDto[] | null = null;
  allAuthorsLoaded$: Observable<boolean>;

  filteredAuthor$: Observable<AuthorDataDto[] | null>;
  filteredAuthors: AuthorDataDto[] | null = null;

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
    this.allAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadAllAuthors());
    });
    
    this.allAuthor$.subscribe(allAuthors => {
      this.allAuthors = allAuthors;
    });

    this.filteredAuthor$.subscribe(filtered => {
      this.filteredAuthors = filtered;
    });
  }

  constructor(private store: Store){
    this.allAuthor$ = this.store.select(selectAllAuthors);
    this.allAuthorsLoaded$ = this.store.select(selectAllAuthorsLoaded);
    this.filteredAuthor$ = this.store.select(selectAuthorsByFirstLetter);
  }

}
