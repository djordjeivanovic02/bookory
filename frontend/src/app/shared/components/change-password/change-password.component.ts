import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangePassword } from '../../../core/interfaces/change-passwords.interface'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Input()
  isError: boolean = false;
  @Input()
  isSuccess: boolean = false;
  @Input()
  notification: string = '';
  @Input()
  title: string = '';

  @Output()
  passwordsEmmit = new EventEmitter<ChangePassword>();

  passwords = {
    oldPassword: '',
    newPassword: '',
    repeatedPassword: ''
  }; 

  setPassword(type: number, value: string) {
    switch(type) {
      case 0:
        this.passwords.oldPassword = value;
        break;
      case 1:
        this.passwords.newPassword = value;
        break;
      case 2:
        this.passwords.repeatedPassword = value;
        break;
    }

    this.passwordsEmmit.emit(this.passwords);
  }
}
