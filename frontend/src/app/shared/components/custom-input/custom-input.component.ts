import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrls: ["./custom-input.component.scss"],
})
export class CustomInputComponent implements OnInit, OnChanges {
  @Input()
  title: string = "";
  @Input()
  isPassword: boolean = false;
  @Input()
  placeholder: string = "";
  @Input()
  isRequired: boolean = true;
  @Input()
  type: string = "text";
  @Input()
  addition: string | null = null;
  @Input()
  isDisabled: boolean = true;
  @Input()
  defaultText: string = '';

  @Output() 
  valueChange = new EventEmitter<string>();
  
  formControlName: FormControl; 

  constructor() {
    this.formControlName = new FormControl({ value: '', disabled: this.isDisabled });
  }

  ngOnInit(): void {
    this.formControlName.valueChanges.subscribe(value => {
      this.valueChange.emit(value ? value : '');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDisabled']) {
      if (this.isDisabled) {
        this.formControlName.disable();
      } else {
        this.formControlName.enable();
      }
    }

    if (changes['defaultText']) {
      this.formControlName.setValue(this.defaultText, { emitEvent: false });
    }
  }
}
