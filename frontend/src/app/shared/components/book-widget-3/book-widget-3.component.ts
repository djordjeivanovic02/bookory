import { Component, Input } from "@angular/core";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { BookInfoDto } from "../../dtos/book-info.dto";

@Component({
  selector: "app-book-widget-3",
  templateUrl: "./book-widget-3.component.html",
  styleUrl: "./book-widget-3.component.scss",
})
export class BookWidget3Component {
  @Input()
  book: BookInfoDto | null = null;
  
  faRemove = faRemove;
  faEdit = faEdit;
}
