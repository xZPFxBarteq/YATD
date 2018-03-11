import {async, TestBed} from '@angular/core/testing';

import {NewItemComponent} from './new-item.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../classes/todo-fixture";
import {ToDoListRepositoryMock} from "../../../todo-page/components/todo-list/mocks/to-do-list-repository-mock";
import {TodoListRepositoryService} from "../../../todo-page/components/todo-list/services/todo-list-repository.service";

describe('NewItemComponent', () => {
  let component : NewItemComponent;
  let fixture : TodoFixture<NewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [NewItemComponent],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListRepositoryService, useClass : ToDoListRepositoryMock}
      ]
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
    expect(fixture.cssQuery('.add-new-row button').disabled).toBeTruthy();
  });

  it('should enable add button when list name is present', () => {
    fixture.setInputValue('.add-new-row mat-form-field input', 'newListName');
    expect(fixture.cssQuery('.add-new-row button').disabled).toBeFalsy();
  });

  it('should emit event when new list is added', async(() => {
    spyOn(component.onNewItemAdded, 'emit');
    fixture.setInputValue('.add-new-row mat-form-field input', 'newListName');
    fixture.clickButton('.add-new-row button');
    fixture.whenStable().then(() => {
      expect(component.onNewItemAdded.emit).toHaveBeenCalled();
    });
  }));



});
