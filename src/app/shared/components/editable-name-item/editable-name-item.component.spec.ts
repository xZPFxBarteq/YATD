import {async, TestBed} from '@angular/core/testing';

import {EditableNameItemComponent} from './editable-name-item.component';
import {FormsModule} from "@angular/forms";
import {TodoListsRepositoryMock} from "../../../todo-page/components/todo-lists/mocks/todo-lists-repository-mock";
import {MaterialModule} from "../../../modules/material.module";
import {TodoListsRepositoryService} from "../../../todo-page/components/todo-lists/services/todo-lists-repository.service";
import {TodoList} from "../../../todo-page/components/todo-lists/classes/todo-list";
import {TodoFixture} from "../../classes/todo-fixture";

describe('EditableNameItemComponent', () => {
  let component : EditableNameItemComponent;
  let fixture : TodoFixture<EditableNameItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [EditableNameItemComponent],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListsRepositoryService, useClass : TodoListsRepositoryMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<EditableNameItemComponent>(TestBed.createComponent(EditableNameItemComponent));
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
    component.onItemClicked.subscribe((clickedList : TodoList) => {
      expect(clickedList.name).toEqual('existingTestList');
    });
    fixture.detectChanges();
    fixture.clickElement('span');
  });

  function enterEditMode() : void {
    component.todoList = fixture.todoList('existingTestList');
    component.editName();
    fixture.detectChanges();
  }

});
