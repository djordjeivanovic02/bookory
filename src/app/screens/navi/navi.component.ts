import { Component } from "@angular/core";
import { faSearch, faUser, faHeart, faNewspaper, faPhone } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-navi",
  templateUrl: "./navi.component.html",
  styleUrl: "./navi.component.scss"
})
export class NaviComponent {
  faSearch = faSearch;
  faUser = faUser;
  faHeart = faHeart;
  faNewspaper = faNewspaper;
  faPhone = faPhone;
}
