import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./screens/index/index.component";
import { LoginComponent } from "./screens/login/login.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
