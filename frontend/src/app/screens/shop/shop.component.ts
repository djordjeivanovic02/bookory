import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavLink } from "../../core/interfaces/navlink.interface";
import {
  faClose,
  faList,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";

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

  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    
  }

  constructor(private store: Store){
  
  }
}
