import {async, TestBed} from '@angular/core/testing';

import {NewTodoListComponent} from './new-todo-list.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../../shared/classes/todo-fixture";
import {ToDoListRepositoryMock} from "../todo-list/mocks/to-do-list-repository-mock";
import {TodoListRepositoryService} from "../todo-list/services/todo-list-repository.service";

describe('NewTodoListComponent', () => {
  let component : NewTodoListComponent;
  let fixture : TodoFixture<NewTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [NewTodoListComponent],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListRepositoryService, useClass : ToDoListRepositoryMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture(TestBed.createComponent(NewTodoListComponent));
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
    fixture.detectChanges();
    expect(fixture.cssQuery('.add-new-row button').disabled).toBeFalsy();
  });

  it('should emit event when new list is added', async(() => {
    spyOn(component.onNewListAdded, 'emit');
    fixture.setInputValue('.add-new-row mat-form-field input', 'newListName');
    fixture.clickButton('.add-new-row button');
    fixture.whenStable().then(() => {
      expect(component.onNewListAdded.emit).toHaveBeenCalled();
    });
  }));



});
