import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import {AppRoutingModule} from './modules/app-routing.module';
import {MaterialModule} from './modules/material.module';
import {UserBarComponent} from './user-bar/user-bar.component';
import {TodoPageComponent} from './todo-page/todo-page.component';
import {NewItemComponent} from './shared/components/new-item/new-item.component';
import {TodoListComponent} from "./todo-page/components/todo-list/todo-list.component";
import {EditableNameItemComponent} from "./shared/components/editable-name-item/editable-name-item.component";
import {NameSearchPipe} from "./shared/pipes/name-search.pipe";
import {SearchFieldComponent} from "./shared/components/search-field/search-field.component";
import {TodoListRepositoryService} from "./todo-page/components/todo-list/services/todo-list-repository.service";
import {ArrayUpdaterService} from "./shared/services/array-updater.service";
import {TodoComponent} from './todo-page/components/todo/todo.component';
import {TodoRepositoryService} from "./todo-page/components/todo/services/todo-repository.service";
import {CoreModule} from "./modules/core.module";
import {AngularWebStorageModule} from "angular-web-storage";
import {ErrorHandlerService} from "./shared/services/error-handler.service";
import {ErrorDialogComponent} from './shared/components/error-dialog/error-dialog.component';
import {RepositoryService} from "./shared/services/repository.service";

let authorizationConfig = new AuthServiceConfig([
  {
    id : GoogleLoginProvider.PROVIDER_ID,
    provider : new GoogleLoginProvider("991607936961-c5fair5rk2mp0q05nv52e09ddjm3pp8f.apps.googleusercontent.com")
  }
]);

@NgModule({
  declarations : [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    UserBarComponent,
    EditableNameItemComponent,
    TodoPageComponent,
    NewItemComponent,
    NameSearchPipe,
    SearchFieldComponent,
    TodoComponent,
    ErrorDialogComponent
  ],
  imports : [
    CoreModule,
    AngularWebStorageModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    SocialLoginModule.initialize(authorizationConfig)
  ],
  entryComponents : [ErrorDialogComponent],
  providers : [
    RepositoryService,
    TodoListRepositoryService,
    TodoRepositoryService,
    ArrayUpdaterService,
    ErrorHandlerService],
  bootstrap : [AppComponent]
})
export class AppModule {
}
