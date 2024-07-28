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
  placeholder: string = "";
  @Input()
  isRequired: Boolean = true;
  @Input()
  type: String = "text";
  @Input()
  addition: string | null = null;
  @Input()
  isDisabled: boolean = false;
  @Input()
  formControlName: string = "";
}
