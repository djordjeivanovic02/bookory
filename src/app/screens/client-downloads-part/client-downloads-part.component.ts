import { Component } from "@angular/core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-client-downloads-part",
  templateUrl: "./client-downloads-part.component.html",
  styleUrl: "./client-downloads-part.component.scss",
})
export class ClientDownloadsPartComponent {
  faDownload = faDownload;
}
