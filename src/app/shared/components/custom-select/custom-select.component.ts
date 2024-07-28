import { Component, Input } from "@angular/core";
import { categories } from "../../local-lists/categories";

@Component({
  selector: "app-custom-select",
  templateUrl: "./custom-select.component.html",
  styleUrl: "./custom-select.component.scss",
})
export class CustomSelectComponent {
  @Input()
  title: String = "";
  @Input()
  isRequired: Boolean = true;
  @Input()
  addition: string | null = null;
  @Input()
  formControlName: string = "";

  categories = categories;
}
