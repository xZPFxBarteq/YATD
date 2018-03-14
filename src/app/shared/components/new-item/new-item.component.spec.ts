import {async, TestBed} from '@angular/core/testing';

import {NewItemComponent} from './new-item.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../classes/todo-fixture";

describe('NewItemComponent', () => {
  let component : NewItemComponent;
  let fixture : TodoFixture<NewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [NewItemComponent],
      imports : [MaterialModule, FormsModule]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture(TestBed.createComponent(NewItemComponent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable add button when list name is empty', () => {
    expect(fixture.cssQuery('.add-new-item button').disabled).toBeTruthy();
  });

  it('should enable add button when list name is present', () => {
    fixture.setInputValue('.add-new-item mat-form-field input', 'newListName');
    expect(fixture.cssQuery('.add-new-item button').disabled).toBeFalsy();
  });

  it('should emit event when new list is added', async(() => {
    spyOn(component.onNewItemAdded, 'emit');
    fixture.setInputValue('.add-new-item mat-form-field input', 'newListName');
    fixture.clickButton('.add-new-item button');
    fixture.whenStable().then(() => {
      expect(component.onNewItemAdded.emit).toHaveBeenCalled();
    });
  }));


});
