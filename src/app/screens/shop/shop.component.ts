import { Component } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrl: "./shop.component.scss",
})
export class ShopComponent {
  links: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
}
