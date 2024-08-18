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
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { AuthorWidget1Component } from "./shared/components/author-widget-1/author-widget-1.component";
import { CategoriesGalleryComponent } from "./shared/components/categories-gallery/categories-gallery.component";
import { CategoryItemComponent } from "./shared/components/category-item/category-item.component";
import { LoginComponent } from "./screens/login/login.component";
import { CustomInputComponent } from "./shared/components/custom-input/custom-input.component";
import { LoginRegisterButtonComponent } from "./shared/components/login-register-button/login-register-button.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BookComponent } from "./screens/book/book.component";
import { LinksNavComponent } from "./shared/components/links-nav/links-nav.component";
import { ZoomOnHoverDirective } from "./core/directives/zoom-on-hover.directive";
import { StarsComponent } from "./shared/components/stars/stars.component";
import { ButtonWithIconComponent } from "./shared/components/button-with-icon/button-with-icon.component";
import { CommentComponent } from "./shared/components/comment/comment.component";
import { RatingComponent } from "./shared/components/rating/rating.component";
import { AuthorComponent } from "./screens/author/author.component";
import { BookWidget2Component } from "./shared/components/book-widget-2/book-widget-2.component";
import { FooterComponent } from "./screens/footer/footer.component";
import { HeadtagComponent } from "./shared/components/headtag/headtag.component";
import { ShopComponent } from "./screens/shop/shop.component";
import { SavedComponent } from "./screens/saved/saved.component";
import { SavedListComponent } from "./shared/lists/saved-list/saved-list.component";
import { SavedItemComponent } from "./shared/components/saved-item/saved-item.component";
import { AllAuthorsComponent } from "./screens/all-authors/all-authors.component";
import { AuthorSmallWidgetComponent } from "./shared/components/author-small-widget/author-small-widget.component";
import { ClientDashboardComponent } from "./screens/client-dashboard/client-dashboard.component";
import { ClientDashboardPartComponent } from "./screens/client-dashboard-part/client-dashboard-part.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { ClientProfileDataComponent } from "./screens/client-profile-data/client-profile-data.component";
import { ChangePasswordComponent } from "./shared/components/change-password/change-password.component";
import { ClientDownloadsPartComponent } from "./screens/client-downloads-part/client-downloads-part.component";
import { DownloadedListComponent } from "./shared/lists/downloaded-list/downloaded-list.component";
import { AuthorDashboardComponent } from "./screens/author-dashboard/author-dashboard.component";
import { AuthorProfileDataComponent } from "./screens/author-profile-data/author-profile-data.component";
import { AuthorMyBooksComponent } from "./screens/author-my-books/author-my-books.component";
import { BookWidget3Component } from "./shared/components/book-widget-3/book-widget-3.component";
import { AddNewBookComponent } from "./screens/add-new-book/add-new-book.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UploadImageComponent } from './shared/components/upload-image/upload-image.component';
import { CustomTextareaComponent } from './shared/components/custom-textarea/custom-textarea.component';
import { CustomSelectComponent } from './shared/components/custom-select/custom-select.component';
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./shared/store/auth/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./shared/store/auth/auth.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { reducers } from "./app.state";
import { UserEffects } from "./shared/store/user/user.effects";
import { AuthorEffects } from "./shared/store/author/author.effects";
import { BookEffects } from "./shared/store/book/book.effects";
import { NewestListComponent } from './shared/lists/newest-list/newest-list.component';
import { LoadmoreComponent } from './shared/components/loadmore/loadmore.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { BestAuthorsListComponent } from './shared/lists/best-authors-list/best-authors-list.component';
import { ShopListComponent } from './shared/lists/shop-list/shop-list.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';

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
    SavedComponent,
    SavedListComponent,
    SavedItemComponent,
    AllAuthorsComponent,
    AuthorSmallWidgetComponent,
    ClientDashboardComponent,
    ClientDashboardPartComponent,
    NotFoundComponent,
    ClientProfileDataComponent,
    ChangePasswordComponent,
    ClientDownloadsPartComponent,
    DownloadedListComponent,
    AuthorDashboardComponent,
    AuthorProfileDataComponent,
    AuthorMyBooksComponent,
    BookWidget3Component,
    AddNewBookComponent,
    UploadImageComponent,
    CustomTextareaComponent,
    CustomSelectComponent,
    NewestListComponent,
    LoadmoreComponent,
    ErrorComponent,
    BestAuthorsListComponent,
    ShopListComponent,
    AboutUsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UserEffects, BookEffects, AuthorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
