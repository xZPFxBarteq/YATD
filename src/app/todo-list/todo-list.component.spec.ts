import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {MaterialModule} from "../modules/material.module";
import {ToDoListRepositoryService} from "./services/to-do-list-repository.service";
import {TodoListArrayUpdaterService} from "./services/todo-list-array-updater.service";
import {ToDoListRepositoryMock} from "./mocks/to-do-list-repository-mock";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [MaterialModule, FormsModule],
      providers : [
        {provide : ToDoListRepositoryService, useClass : ToDoListRepositoryMock},
        {provide : TodoListArrayUpdaterService, useClass : TodoListArrayUpdaterService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create row for already existing list', () => {
    expect(cssQuery('#existingTestList')).not.toBeNull();
  });

  it('should contain remove button', () => {
    expect(cssQuery('#existingTestList button:nth-child(1)').textContent).toEqual('Remove');
  });

  it('should contain edit name button', () => {
    expect(cssQuery('#existingTestList button:nth-child(2)').textContent).toEqual('Edit name');
  });

  it('should have panel with existing list name when name is not edited', () => {
    expect(cssQuery('#existingTestList mat-expansion-panel mat-expansion-panel-header mat-panel-title span').textContent).toEqual('existingTestList');
  });

  it('should disable panel when name is edited', () => {
    cssQuery('#existingTestList button:nth-child(2)').click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(cssQuery('#existingTestList mat-expansion-panel').getAttribute('ng-reflect-disabled')).toBeTruthy();
    });

  });

  it('should remove list', async(() => {
    cssQuery('#existingTestList button:nth-child(1)').click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let lists : HTMLDivElement = fixture.nativeElement.querySelector('.todoLists');
      expect(lists.querySelector('#existingTestList')).toBeNull();
    })
  }));

  it('should enable add button when name input has value',() => {
    setInputValue('.add-new-row mat-form-field input', 'listName');

    fixture.whenStable().then(() => {
      expect(cssQuery('.add-new-row button').disabled).toBeFalsy();
    });
  });

  it('should add new list', async(() => {
    setInputValue('.add-new-row mat-form-field input', 'addedList');

    fixture.whenStable().then(() => {
      cssQuery('.add-new-row button').click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(cssQuery('#addedList')).not.toBeNull();
      })
    });
  }));

  function cssQuery(css : string) : any {
    return fixture.debugElement.query(By.css(css)).nativeElement;
  }

  function setInputValue(inputSelector : string, value : string) : void {
    let input : HTMLInputElement = cssQuery(inputSelector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }


});
