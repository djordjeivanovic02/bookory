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
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AuthorWidget1Component } from "./shared/components/author-widget-1/author-widget-1.component";
import { CategoriesGalleryComponent } from "./shared/components/categories-gallery/categories-gallery.component";
import { CategoryItemComponent } from "./shared/components/category-item/category-item.component";
import { LoginComponent } from "./screens/login/login.component";
import { CustomInputComponent } from "./shared/components/custom-input/custom-input.component";
import { LoginRegisterButtonComponent } from "./shared/components/login-register-button/login-register-button.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BookComponent } from './screens/book/book.component';
import { LinksNavComponent } from './shared/components/links-nav/links-nav.component';
import { ZoomOnHoverDirective } from './core/directives/zoom-on-hover.directive';
import { StarsComponent } from './shared/components/stars/stars.component';
import { ButtonWithIconComponent } from './shared/components/button-with-icon/button-with-icon.component';
import { CommentComponent } from './shared/components/comment/comment.component';
import { RatingComponent } from './shared/components/rating/rating.component';
import { AuthorComponent } from './screens/author/author.component';
import { BookWidget2Component } from './shared/components/book-widget-2/book-widget-2.component';
import { FooterComponent } from './screens/footer/footer.component';
import { HeadtagComponent } from './shared/components/headtag/headtag.component';
import { ShopComponent } from './screens/shop/shop.component';

@NgModule({ declarations: [
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
        CustomInputComponent,
        LoginRegisterButtonComponent,
        BookComponent,
        LinksNavComponent,
        ZoomOnHoverDirective,
        StarsComponent,
        ButtonWithIconComponent,
        CommentComponent,
        RatingComponent,
        AuthorComponent,
        BookWidget2Component,
        FooterComponent,
        HeadtagComponent,
        ShopComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        AppRoutingModule,
        BrowserAnimationsModule], providers: [provideClientHydration(), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
