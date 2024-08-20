import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  faSearch,
  faUser,
  faHeart,
  faNewspaper,
  faPhone,
  faMobile,
  fa0,
  fa1,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subscription, switchMap } from "rxjs";
import { BookService } from "../../shared/services/book/book.service";
import { BookInfoDto } from "../../shared/dtos/book-info.dto";

@Component({
  selector: "app-navi",
  templateUrl: "./navi.component.html",
  styleUrl: "./navi.component.scss",
})
export class NaviComponent implements OnInit, OnDestroy{
  faSearch = faSearch;
  faUser = faUser;
  faHeart = faHeart;
  faNewspaper = faNewspaper;
  faPhone = faPhone;
  faHamburger = faMobileScreenButton;

  showMobileMenu: boolean = false;

  showDropDown: boolean = false;

  searchControl = new FormControl();
  
  searchItems: BookInfoDto[] | null = null;
  saerchItemSubscription: Subscription = new Subscription();

  toggleShowMobileMenu(value: boolean, event: Event) {
    event.preventDefault();
    this.showMobileMenu = value;
  }

  searchChange(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if(selectedValue !== null && selectedValue !== ''){
      this.showDropDown = true;
    }
  }
  search(query: string): Observable<BookInfoDto[]>{
    return this.bookService.search(query);
  }

  ngOnInit() {
    this.saerchItemSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => {
          if (value.length <= 3) {
            this.showDropDown = false;
            return false;
          }
          return value.length > 3;
        }),
        switchMap(value => this.search(value))
      )
      .subscribe(results => {
        if (results && results.length > 0) {
          this.showDropDown = true;
          this.searchItems = results;
          console.log(this.searchItems);
        }else{
          this.showDropDown = false;
        }
      });
  }
  

  ngOnDestroy(): void {
    this.saerchItemSubscription.unsubscribe();
  }

  constructor(private bookService: BookService){}
}
