import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./screens/index/index.component";
import { LoginComponent } from "./screens/login/login.component";
import { BookComponent } from "./screens/book/book.component";
import { AuthorComponent } from "./screens/author/author.component";
import { ShopComponent } from "./screens/shop/shop.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "book", component: BookComponent },
  { path: "author", component: AuthorComponent },
  { path: "shop", component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
