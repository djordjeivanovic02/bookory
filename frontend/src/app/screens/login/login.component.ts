import { Component, OnInit } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { Store } from "@ngrx/store";
import { login, registerUser } from "../../shared/store/auth/auth.actions";
import { Observable } from "rxjs";
import { selectAuthError, selectAuthState } from "../../shared/store/auth/auth.selectores";
import { AuthState } from "../../shared/store/auth/auth.reducer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  faArrowRight = faArrowRight;
  isWriter: Boolean = false;
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  isError: Boolean = false;
  isSuccess: Boolean = false;
  notification: string = "";
  loginButtonDisabled = true;

  authError$: Observable<any>;

  email: string = '';
  password: string = '';
  
  onEmailValueChange(value: string){
    this.email = value;
    if(this.email !== '' && this.password !== '') this.loginButtonDisabled = false;
  }
  onPasswordValueChange(value: string){
    this.password = value;
    if(this.email !== '' && this.password !== '') this.loginButtonDisabled = false;
  }
  login(){
    this.store.dispatch(login({username: this.email, password: this.password}));
  }

  registerEmail: string = '';
  registerPassword: string = '';

  onRegisterEmailChange(value: string){
    this.registerEmail = value;
  }
  onRegisterPasswordChange(value: string){
    this.registerPassword = value;
  }

  register(){
    if(this.isWriter){

    }else{
      this.store.dispatch(registerUser({email: this.registerEmail, password: this.registerPassword}));
    }
  }

  toggleWriter(value: Boolean) {
    this.isWriter = value;
  }

  constructor(
    private store: Store
  ){
    this.authError$ = this.store.select(selectAuthError);
  }
  
  ngOnInit() {
    this.authError$.subscribe(error => {
      if (error) {
        console.log(error);
        this.isError = true;
        this.notification = error;
      }
    });
  }
}
