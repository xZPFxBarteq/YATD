import {async, TestBed} from '@angular/core/testing';

import {TodoListNameComponent} from './todo-list-name.component';
import {FormsModule} from "@angular/forms";
import {ToDoListRepositoryMock} from "../../mocks/to-do-list-repository-mock";
import {MaterialModule} from "../../../../../modules/material.module";
import {TodoListRepositoryService} from "../../services/todo-list-repository.service";
import {TodoList} from "../../classes/todo-list";
import {TodoFixture} from "../../../../../shared/classes/todo-fixture";

describe('TodoListNameComponent', () => {
  let component : TodoListNameComponent;
  let fixture : TodoFixture<TodoListNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [TodoListNameComponent],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListRepositoryService, useClass : ToDoListRepositoryMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<TodoListNameComponent>(TestBed.createComponent(TodoListNameComponent));
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list name if not in edit mode', () => {
    //when
    component.todoList = fixture.todoList('existingTestList');
    fixture.detectChanges();

    //then
    expect(fixture.cssQuery('span').textContent).toEqual('existingTestList');
  });

  it('should display input with list name as value in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit mat-form-field input').value).toEqual('existingTestList');
    });
  });

  it('should display accept button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit button:nth-child(2)')).not.toBeNull();
    });
  });

  it('should display cancel button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit button:nth-child(3)')).not.toBeNull();
    });
  });

  it('should update list name', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedListName');
      fixture.clickButton('.name-edit button:nth-child(2)');
      expect(fixture.cssQuery('span').textContent).toEqual('changedListName');
    });
  });

  it('should revert list name when cancel is clicked', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedListName');
      fixture.clickButton('.name-edit button:nth-child(3)');
      expect(fixture.cssQuery('span').textContent).toEqual('existingTestList');
    });
  });

  it('should emit event after name update', () => {
    //when
    spyOn(component.onNameUpdate, 'emit');
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedListName');
      fixture.clickButton('.name-edit button:nth-child(2)');
      expect(component.onNameUpdate.emit).toHaveBeenCalled();
    });
  });

  it('should emit event after component has been clicked', () => {
    component.todoList = fixture.todoList('existingTestList');
    component.onListClicked.subscribe((clickedList : TodoList) => {
      expect(clickedList.name).toEqual('existingTestList');
    });
    fixture.detectChanges();
    fixture.clickElement('span');
  });

  function enterEditMode() : void {
    component.todoList = fixture.todoList('existingTestList');
    component.editListName();
    fixture.detectChanges();
  }

});
