import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorDialogComponent} from './error-dialog.component';
import {MaterialModule} from "../../../modules/material.module";
import {FormsModule} from "@angular/forms";

describe('ErrorDialogComponent', () => {
  let component : ErrorDialogComponent;
  let fixture : ComponentFixture<ErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [ErrorDialogComponent],
      imports : [MaterialModule, FormsModule]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
