import { Component } from "@angular/core";

@Component({
  selector: "app-all-authors",
  templateUrl: "./all-authors.component.html",
  styleUrl: "./all-authors.component.scss",
})
export class AllAuthorsComponent {
  selectedLetter: string = "SVI";

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
}
