import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./screens/index/index.component";
import { LoginComponent } from "./screens/login/login.component";
import { BookComponent } from "./screens/book/book.component";
import { AuthorComponent } from "./screens/author/author.component";
import { ShopComponent } from "./screens/shop/shop.component";
import { SavedComponent } from "./screens/saved/saved.component";
import { AllAuthorsComponent } from "./screens/all-authors/all-authors.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "book", component: BookComponent },
  { path: "author", component: AuthorComponent },
  { path: "shop", component: ShopComponent },
  { path: "saved", component: SavedComponent },
  { path: "all-authors", component: AllAuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
