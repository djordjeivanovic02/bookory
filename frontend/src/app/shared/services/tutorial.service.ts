import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TutorialService {
  private jsonURL = "assets/data/tutorial.json";
  constructor(private httpClient: HttpClient) {}

  getTutorial(): Observable<any> {
    return this.httpClient.get<any>(this.jsonURL);
  }
}
