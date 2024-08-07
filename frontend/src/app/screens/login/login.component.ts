import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "../../core/interfaces/navlink.interface";
import { AuthService } from "../../shared/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { login } from "../../shared/store/auth/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  faArrowRight = faArrowRight;
  isWriter: Boolean = false;
  link: NavLink[] = [
    {
      name: "početna",
      route: "/",
    },
  ];
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private store: Store
  ){}

  onEmailValueChange(value: string){
    this.email = value;
  }
  onPasswordValueChange(value: string){
    this.password = value;
  }
  login(){
    this.store.dispatch(login({username: this.email, password: this.password}));
  }

  toggleWriter(value: Boolean) {
    this.isWriter = value;
  }
}
