import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorDataDto } from "../../shared/dtos/author-data.dto";
import { selectAllAuthors, selectAllAuthorsLoaded } from "../../shared/store/author/author.selectors";
import { loadAllAuthors } from "../../shared/store/author/author.actions";

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
  }

  ngOnInit(): void {
    this.allAuthorsLoaded$.subscribe(loaded => {
      if(!loaded) this.store.dispatch(loadAllAuthors());
    })
    
    this.allAuthor$.subscribe(allAuthors => {
      this.allAuthors = allAuthors;
    })
  }

  constructor(private store: Store){
    this.allAuthor$ = this.store.select(selectAllAuthors);
    this.allAuthorsLoaded$ = this.store.select(selectAllAuthorsLoaded);
  }

}
