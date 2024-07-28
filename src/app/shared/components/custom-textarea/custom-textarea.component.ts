import { Component, Input } from "@angular/core";

@Component({
  selector: "app-custom-textarea",
  templateUrl: "./custom-textarea.component.html",
  styleUrl: "./custom-textarea.component.scss",
})
export class CustomTextareaComponent {
  @Input()
  title: String = "";
  @Input()
  placeholder: string = "";
  @Input()
  isRequired: Boolean = true;
  @Input()
  addition: string | null = null;
  @Input()
  formControlName: string = "";
}
