import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./screens/index/index.component";
import { LoginComponent } from "./screens/login/login.component";
import { BookComponent } from "./screens/book/book.component";
import { AuthorComponent } from "./screens/author/author.component";
import { ShopComponent } from "./screens/shop/shop.component";
import { SavedComponent } from "./screens/saved/saved.component";
import { AllAuthorsComponent } from "./screens/all-authors/all-authors.component";
import { ClientDashboardComponent } from "./screens/client-dashboard/client-dashboard.component";
import { AuthorDashboardComponent } from "./screens/author-dashboard/author-dashboard.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NotAuthGuard } from "./shared/guards/not-auth.guard";
import { AuthorGuard } from "./shared/guards/author.guard";
import { AboutUsComponent } from "./screens/about-us/about-us.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: "book/:id", component: BookComponent },
  { path: "about", component: AboutUsComponent },
  { path: "author/:id", component: AuthorComponent },
  { path: "shop", component: ShopComponent },
  // { path: "saved", component: SavedComponent },
  { path: "all-authors", component: AllAuthorsComponent },
  { path: "client-dashboard/:id", component: ClientDashboardComponent, canActivate:[AuthGuard] },
  { path: "author-dashboard", component: AuthorDashboardComponent, canActivate:[AuthorGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

