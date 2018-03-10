import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {TodoPageComponent} from "../todo-page/todo-page.component";

const routes : Routes = [
  {path : '', redirectTo : '/login', pathMatch : 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'lists', component : TodoPageComponent}
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
