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
import { setToken } from "../../shared/store/auth/auth.actions";

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
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        this.store.dispatch(setToken({ token }));
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  toggleWriter(value: Boolean) {
    this.isWriter = value;
  }
}
