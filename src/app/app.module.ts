import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NaviComponent } from "./screens/navi/navi.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IndexComponent } from "./screens/index/index.component";
import { Button1Component } from "./shared/components/button1/button1.component";
import { TutorialItemComponent } from "./shared/components/tutorial-item/tutorial-item.component";
import { BookWidget1Component } from "./shared/components/book-widget-1/book-widget-1.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthorWidget1Component } from "./shared/components/author-widget-1/author-widget-1.component";
import { CategoriesGalleryComponent } from "./shared/components/categories-gallery/categories-gallery.component";
import { CategoryItemComponent } from "./shared/components/category-item/category-item.component";
import { LoginComponent } from './screens/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    IndexComponent,
    Button1Component,
    TutorialItemComponent,
    BookWidget1Component,
    AuthorWidget1Component,
    CategoriesGalleryComponent,
    CategoryItemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
