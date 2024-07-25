import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { faNotdef } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button-with-icon",
  templateUrl: "./button-with-icon.component.html",
  styleUrl: "./button-with-icon.component.scss",
})
export class ButtonWithIconComponent {
  @Input()
  showIcon: boolean = true;
  @Input()
  icon: IconDefinition = faNotdef;
  @Input()
  text: String = "Preuzmi besplatno";
}
