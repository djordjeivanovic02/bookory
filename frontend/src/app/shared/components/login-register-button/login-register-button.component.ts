import { Component, Input } from "@angular/core";

@Component({
  selector: "app-login-register-button",
  templateUrl: "./login-register-button.component.html",
  styleUrl: "./login-register-button.component.scss",
})
export class LoginRegisterButtonComponent {
  @Input()
  text: string = "";
}
