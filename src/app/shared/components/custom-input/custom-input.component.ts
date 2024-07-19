import { Component, Input } from "@angular/core";

@Component({
  selector: "app-custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrl: "./custom-input.component.scss",
})
export class CustomInputComponent {
  @Input()
  title: String = "";
  @Input()
  isPassword: Boolean = false;
  @Input()
  placeholder: String = "";
  @Input()
  isRequired: Boolean = true;
  @Input()
  type: String = "text";
}
