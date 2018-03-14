import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {ErrorMessage} from "./classes/error-message";

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  protected error : string;

  constructor(@Inject(MAT_DIALOG_DATA) errorMessage : ErrorMessage) {
    this.error = errorMessage.message;
  }

  ngOnInit() {
  }

}
