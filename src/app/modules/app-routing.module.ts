import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {TodoPageComponent} from "../todo-page/todo-page.component";
import {ServerSelectedGuard} from "../todo-page/guards/server-selected.guard";

const routes : Routes = [
  {path : '', redirectTo : '/login', pathMatch : 'full'},
  {path : 'login', component : LoginComponent},
  {
    path : 'lists',
    component : TodoPageComponent,
    canActivate : [ServerSelectedGuard]
  }
];

@NgModule({
  exports : [RouterModule],
  imports : [RouterModule.forRoot(routes)],
  providers : [ServerSelectedGuard]
})
export class AppRoutingModule {
}
