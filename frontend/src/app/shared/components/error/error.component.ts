import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  @Input()
  isError: boolean = false;
  @Input()
  isSuccess: boolean = false;
  @Input()
  notification: string = '';
  @Input()
  title: string = '';
}
