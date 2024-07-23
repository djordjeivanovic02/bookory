import { Component, Input } from "@angular/core";
import { NavLink } from "../../../core/interfaces/navlink.interface";

@Component({
  selector: "app-headtag",
  templateUrl: "./headtag.component.html",
  styleUrl: "./headtag.component.scss",
})
export class HeadtagComponent {
  @Input()
  title: string = "";
  @Input()
  link: NavLink[] = [];
  @Input()
  currentLink: string = "";
}
