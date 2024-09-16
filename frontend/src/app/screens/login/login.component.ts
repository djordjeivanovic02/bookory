import { Component, OnDestroy, OnInit } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { Store } from "@ngrx/store";
import { login, registerAuthor, registerUser } from "../../shared/store/auth/auth.actions";
import { Observable, Subscription } from "rxjs";
import { selectAuthError, selectAuthSuccess } from "../../shared/store/auth/auth.selectores";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit, OnDestroy {
  faArrowRight = faArrowRight;
  isWriter: Boolean = false;
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  isError: boolean = false;
  isSuccess: boolean = false;
  notification: string = "";
  loginButtonDisabled = true;

  authError$: Observable<any>;
  authErrorSubscription: Subscription = new Subscription();
  authSucces$: Observable<any>;
  authSuccessSubscription: Subscription = new Subscription();

  email: string = '';
  password: string = '';
  enableLoginButton() {
    if (this.email !== '' && this.password !== '') this.loginButtonDisabled = false;
  }
  onEmailValueChange(value: string) {
    this.email = value;
    this.enableLoginButton();
  }
  onPasswordValueChange(value: string) {
    this.password = value;
    this.enableLoginButton();
  }
  login() {
    this.store.dispatch(login({ username: this.email, password: this.password }));
  }

  registerEmail: string = '';
  registerPassword: string = '';
  registerName: string = '';
  registerSurname: string = '';
  registerWebsite: string = '';
  registerButtonDisabled: boolean = true;

  onRegisterEmailChange(value: string) {
    this.registerEmail = value;
    this.validateRegister();
  }
  onRegisterPasswordChange(value: string) {
    this.registerPassword = value;
    this.validateRegister();
  }
  onRegisterNameChange(value: string) {
    this.registerName = value;
    this.validateRegister();
  }
  onRegisterSurnameChange(value: string) {
    this.registerSurname = value;
    this.validateRegister();
  }
  onRegisterWebsiteChange(value: string) {
    this.registerWebsite = value;
  }

  register() {
    if (this.isWriter) {
      this.store.dispatch(registerAuthor({ name: this.registerName, surname: this.registerSurname, email: this.registerEmail, password: this.registerPassword, website: this.registerWebsite }))
    } else {
      this.store.dispatch(registerUser({ email: this.registerEmail, password: this.registerPassword }));
    }
  }

  validateRegister() {
    if (this.isWriter && this.registerEmail !== '' && this.registerPassword !== '' && this.registerName !== '' && this.registerSurname !== '') {
      this.registerButtonDisabled = false;
    } else if (!this.isWriter && this.registerEmail !== '' && this.registerPassword !== '') {
      this.registerButtonDisabled = false;
    } else {
      this.registerButtonDisabled = true;
    }
  }

  toggleWriter(value: Boolean) {
    this.isWriter = value;
    this.validateRegister();
  }

  ngOnInit() {
    this.authErrorSubscription = this.authError$.subscribe(error => {
      if (error) {
        this.isSuccess = false;
        this.isError = true;
        this.notification = error;
      }
    });

    this.authSuccessSubscription = this.authSucces$.subscribe(user => {
      if (user) {
        this.isError = false;
        this.isSuccess = true;
        this.notification = "Uspešno ste se registrovali! Sada možete da se prijavite."
      }
    })
  }

  ngOnDestroy(): void {
    this.authErrorSubscription.unsubscribe();
    this.authSuccessSubscription.unsubscribe();
  }

  constructor(
    private store: Store
  ) {
    this.authError$ = this.store.select(selectAuthError);
    this.authSucces$ = this.store.select(selectAuthSuccess);
  }
}
