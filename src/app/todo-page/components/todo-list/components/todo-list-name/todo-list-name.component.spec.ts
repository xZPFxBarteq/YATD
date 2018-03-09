import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListNameComponent} from './todo-list-name.component';
import {FormsModule} from "@angular/forms";
import {ToDoListRepositoryMock} from "../../mocks/to-do-list-repository-mock";
import {MaterialModule} from "../../../../../modules/material.module";
import {TodoListRepositoryService} from "../../services/todo-list-repository.service";
import {TodoList} from "../../classes/todo-list";
import {By} from "@angular/platform-browser";

describe('TodoListNameComponent', () => {
  let component : TodoListNameComponent;
  let fixture : ComponentFixture<TodoListNameComponent>;

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
    fixture = TestBed.createComponent(TodoListNameComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list name if not in edit mode', () => {
    //when
    component.todoList = todoList('existingTestList');
    fixture.detectChanges();

    //then
    expect(cssQuery('span').textContent).toEqual('existingTestList');
  });

  it('should display input with list name as value in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(cssQuery('.name-edit mat-form-field input').value).toEqual('existingTestList');
    });
  });

  it('should display accept button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(cssQuery('.name-edit button:nth-child(2)')).not.toBeNull();
    });
  });

  it('should display cancel button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(cssQuery('.name-edit button:nth-child(3)')).not.toBeNull();
    });
  });

  it('should update list name', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      setInputValue('.name-edit mat-form-field input', 'changedListName');
      clickButton('.name-edit button:nth-child(2)');
      expect(cssQuery('span').textContent).toEqual('changedListName');
    });
  });

  it('should revert list name when cancel is clicked', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      setInputValue('.name-edit mat-form-field input', 'changedListName');
      clickButton('.name-edit button:nth-child(3)');
      expect(cssQuery('span').textContent).toEqual('existingTestList');
    });
  });

  it('should emit event after name update', () => {
    //when
    spyOn(component.onNameUpdate, 'emit');
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      setInputValue('.name-edit mat-form-field input', 'changedListName');
      clickButton('.name-edit button:nth-child(2)');
      expect(component.onNameUpdate.emit).toHaveBeenCalled();
    });
  });

  it('should emit event after component has been clicked', () => {
    component.todoList = todoList('existingTestList');
    component.onListClicked.subscribe((clickedList : TodoList) => {
      expect(clickedList.name).toEqual('existingTestList');
    });
    fixture.detectChanges();
    clickElement('span');
  });

  function enterEditMode() : void {
    component.todoList = todoList('existingTestList');
    component.editListName();
    fixture.detectChanges();
  }

  function clickButton(buttonSelector : string) : void {
    cssQuery(buttonSelector).click();
    fixture.detectChanges();
  }

  function clickElement(elementSelector : string) : void {
    fixture.debugElement.query(By.css(elementSelector)).triggerEventHandler('click', null);
    fixture.detectChanges();
  }

  function cssQuery(css : string) : any {
    return fixture.debugElement.query(By.css(css)).nativeElement;
  }

  function todoList(name : string) : TodoList {
    let list : TodoList = new TodoList();
    list.id = name;
    list.name = name;
    return list;
  }

  function setInputValue(inputSelector : string, value : string) : void {
    let input : HTMLInputElement = cssQuery(inputSelector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

});
