import { Component } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-saved-list",
  templateUrl: "./saved-list.component.html",
  styleUrl: "./saved-list.component.scss",
})
export class SavedListComponent {
  faDownload = faDownload;
}
