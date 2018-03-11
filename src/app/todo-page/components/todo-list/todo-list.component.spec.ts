import {async, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {TodoListRepositoryService} from "./services/todo-list-repository.service";
import {TodoListArrayUpdaterService} from "./services/todo-list-array-updater.service";
import {ToDoListRepositoryMock} from "./mocks/to-do-list-repository-mock";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../../shared/classes/todo-fixture";
import {SearchFieldComponent} from "./components/search-field/search-field.component";
import {TodoListNameComponent} from "./components/todo-list-name/todo-list-name.component";
import {TodoListNameSearchPipe} from "./pipes/todo-list-name-search.pipe";

describe('TodoListComponent', () => {
  let component : TodoListComponent;
  let fixture : TodoFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [TodoListComponent, SearchFieldComponent, TodoListNameComponent, TodoListNameSearchPipe],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListRepositoryService, useClass : ToDoListRepositoryMock},
        {provide : TodoListArrayUpdaterService, useClass : TodoListArrayUpdaterService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<TodoListComponent>(TestBed.createComponent(TodoListComponent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create row for already existing list', () => {
    expect(fixture.cssQuery('#existingTestList')).not.toBeNull();
  });

  it('should remove list', async(() => {
    fixture.clickButton('#existingTestList button:nth-of-type(1)');

    fixture.whenStable().then(() => {
      let lists : HTMLDivElement = fixture.nativeElement.querySelector('.to-do-lists');
      expect(lists.querySelector('#existingTestList')).toBeNull();
    })
  }));

  it('should search for lists', () => {
    fixture.setInputValue('.search mat-form-field input', 'second');
    expect(fixture.cssQuery('#existingTestList')).toBeNull();
    expect(fixture.cssQuery('#secondTestList')).not.toBeNull();
  });

});