import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserDataStoreDto } from '../../shared/dtos/user-data.dto';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectUserData } from '../../shared/store/user/user.selectors';
import { ChangePassword } from '../../core/interfaces/change-passwords.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-client-profile-data',
  templateUrl: './client-profile-data.component.html',
  styleUrl: './client-profile-data.component.scss'
})
export class ClientProfileDataComponent implements OnInit, OnDestroy {
  userData$: Observable<UserDataStoreDto | null>;
  userDataSubscription: Subscription = new Subscription()
  userData: UserDataStoreDto | null = null;

  passwords: ChangePassword | null = null;
  isError: boolean = false;
  isSuccess: boolean = false;
  notification: string = '';
  title: string = '';
  buttonDisabled: boolean = true;

  getPasswords(passwords: ChangePassword){
    this.passwords = passwords;
    this.enableButton();
    this.resetErrorContainer();
  }

  resetErrorContainer(){
    this.isError = this.isSuccess = false;
  }

  enableButton(){
    if(this.passwords?.oldPassword.length! > 6 &&
      this.passwords?.newPassword.length! > 6 &&
      this.passwords?.repeatedPassword.length! > 6
    ){
      this.buttonDisabled = false;
    }
  }

  changeData(){
    this.buttonDisabled = true;
    if (!this.validatePasswords()) return;
    if(this.userData && this.passwords && this.passwords.oldPassword && this.passwords.newPassword){
      this.authService.changePassword(this.userData.id, this.passwords.oldPassword, this.passwords.newPassword).subscribe(
        response => {
          this.isSuccess = true;
          this.title = "Uspešno: ";
          this.notification = response.message;
          this.buttonDisabled = false;
        },
        error => {
          console.log(error);
          this.isError = true;
          this.title = "Greška: ";
          this.notification = error.error.message;
          this.buttonDisabled = false;
        }
      )
    }
  }

  validatePasswords(): boolean {
    if(this.passwords?.newPassword === this.passwords?.repeatedPassword) return true;
    this.isError = true;
    this.title = "Greška: ";
    this.notification = "Lozinke moraju da se poklapaju.";
    this.buttonDisabled = false;
    return false;
  }
  ngOnInit(): void {
    this.userDataSubscription = this.userData$.subscribe(userData => this.userData = userData);
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  constructor(private store: Store, private authService: AuthService){
    this.userData$ = this.store.select(selectUserData);
  }
}
