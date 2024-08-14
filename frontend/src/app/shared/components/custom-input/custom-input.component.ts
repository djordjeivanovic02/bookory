import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrl: "./custom-input.component.scss",
})
export class CustomInputComponent implements OnInit {
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
  isDisabled: boolean = true;

  @Output() 
  valueChange = new EventEmitter<string>();
  formControlName = new FormControl({value: '', disabled: this.isDisabled});

  constructor(){
  }
  ngOnInit(): void {
    this.formControlName.valueChanges.subscribe(value => {
      this.valueChange.emit(value ? value : '');
    });
  }
  ngOnChanges(): void {
    if (this.isDisabled) {
      this.formControlName.disable();
    } else {
      this.formControlName.enable();
    }
  }
}
