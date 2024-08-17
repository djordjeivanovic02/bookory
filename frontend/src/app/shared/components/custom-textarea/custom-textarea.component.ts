import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-custom-textarea",
  templateUrl: "./custom-textarea.component.html",
  styleUrls: ["./custom-textarea.component.scss"],
})
export class CustomTextareaComponent implements OnChanges, OnInit {
  @Input()
  title: string = "";
  @Input()
  placeholder: string = "";
  @Input()
  isRequired: boolean = true;
  @Input()
  addition: string | null = null;
  @Input()
  defaultText: string = '';
  @Input()
  formControl: FormControl = new FormControl({ value: '', disabled: false });

  @Output()
  valueChange = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.formControl.setValue(this.defaultText, { emitEvent: false });
  
    this.formControl.valueChanges.subscribe(value => {
      this.valueChange.emit(value ? value : '');
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultText']) {
      this.formControl.setValue(this.defaultText, { emitEvent: false });
    }

    if (changes['formControl']) {
      if (this.formControl.disabled) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    }
  }

  constructor() {}
}
