import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { categories } from "../../local-lists/categories";

@Component({
  selector: "app-custom-select",
  templateUrl: "./custom-select.component.html",
  styleUrl: "./custom-select.component.scss",
})
export class CustomSelectComponent implements OnInit{
  @Input()
  title: String = "";
  @Input()
  isRequired: Boolean = true;
  @Input()
  addition: string | null = null;

  categories = categories;

  @Output()
  categoryEmmiter = new EventEmitter<string>();

  selectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.categoryEmmiter.emit(value);
  }

  ngOnInit(): void {
    // console.log(this.categories);
  }
}
