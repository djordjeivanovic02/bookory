import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

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

  @Output() valueChange = new EventEmitter<string>();
  formControlName = new FormControl('');

  constructor(){
    this.formControlName.valueChanges.subscribe(value => {
      this.valueChange.emit(value ? value : '');
    })
  }
}
