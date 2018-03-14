import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {MatDialog} from "@angular/material";
import {ErrorDialogComponent} from "../components/error-dialog/error-dialog.component";
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandlerService {

  private guiMsg : string = 'Uh oh, there\'s something wrong with the app. Sorry about that.';
  private serverMsg : string = 'Seems that something went wrong on server side. Sorry about that.';

  constructor(private dialog : MatDialog,
              private router : Router) {
  }

  //this has to be a field, so 'this' can be properly resolved out of scope of this class
  public handle : (error : HttpErrorResponse) => ErrorObservable = (error : HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      this.dialog.open(ErrorDialogComponent, {
        data : {message : this.guiMsg}
      }).afterClosed().subscribe(() => this.router.navigateByUrl('/login'));
      return new ErrorObservable(this.guiMsg);
    }

    console.error(`Backend returned code ${error.status} body was: ${error.error}`);
    this.dialog.open(ErrorDialogComponent, {
      data : {message : this.serverMsg}
    }).afterClosed().subscribe(() => this.router.navigateByUrl('/login'));
    return new ErrorObservable(this.serverMsg);
  }

}
