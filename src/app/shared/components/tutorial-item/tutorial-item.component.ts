import { Component, Input, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import {
  faGift,
  faClock,
  faBook,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { TutorialService } from "../../services/tutorial.service";

@Component({
  selector: "app-tutorial-item",
  templateUrl: "./tutorial-item.component.html",
  styleUrl: "./tutorial-item.component.scss",
})
export class TutorialItemComponent implements OnInit {
  icons: IconDefinition[] = [faGift, faBook, faClock, faDownload];
  tutorials: any[] = [];

  @Input()
  icon: IconDefinition = faGift;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.tutorialService.getTutorial().subscribe((data) => {
      this.tutorials = data.tutorial;
    });
  }
}
