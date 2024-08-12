import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loadmore',
  templateUrl: './loadmore.component.html',
  styleUrl: './loadmore.component.scss'
})
export class LoadmoreComponent {
  @Input()
  maxValue: number | undefined = 100;

  @Input()
  minValue: number | undefined = 20;

  @Output()
  clickTrigger = new EventEmitter<void>();

  clickHandler(event: Event){
    event.preventDefault();
    this.clickTrigger.emit();
  }
}
