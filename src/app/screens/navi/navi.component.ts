import { Component } from "@angular/core";
import { faSearch, faUser, faHeart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-navi",
  templateUrl: "./navi.component.html",
  styleUrl: "./navi.component.scss"
})
export class NaviComponent {
  faSearch = faSearch;
  faUser = faUser;
  faHeart = faHeart;
}
