import { Component, Input } from "@angular/core";

@Component({
  selector: "app-category-item",
  templateUrl: "./category-item.component.html",
  styleUrl: "./category-item.component.scss",
})
export class CategoryItemComponent {
  @Input()
  image: String = "";
}
