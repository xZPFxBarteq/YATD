import {async, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {TodoFixture} from "../../../shared/classes/todo-fixture";
import {NewItemComponent} from "../../../shared/components/new-item/new-item.component";
import {EditableNameItemComponent} from "../../../shared/components/editable-name-item/editable-name-item.component";
import {SearchFieldComponent} from "../../../shared/components/search-field/search-field.component";
import {NameSearchPipe} from "../../../shared/pipes/name-search.pipe";
import {MaterialModule} from "../../../modules/material.module";
import {FormsModule} from "@angular/forms";
import {ArrayUpdaterService} from "../../../shared/services/array-updater.service";
import {TodoRepositoryService} from "./services/todo-repository.service";
import {TodoRepositoryMock} from "./mocks/todo-repository-mock";
import {FilterByCompletionPipe} from "./pipes/filter-by-completion.pipe";
import {TodoListFilteringComponent} from "./components/todo-list-filtering/todo-list-filtering.component";

describe('TodoListComponent', () => {
  let component : TodoListComponent;
  let fixture : TodoFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [
        TodoListComponent,
        SearchFieldComponent,
        EditableNameItemComponent,
        NewItemComponent,
        TodoListFilteringComponent,
        NameSearchPipe,
        FilterByCompletionPipe],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoRepositoryService, useClass : TodoRepositoryMock},
        {provide : ArrayUpdaterService, useClass : ArrayUpdaterService}]
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

  it('should have two todos listed', () => {
    expect(fixture.cssQuery('#incompleteTodo')).not.toBeNull();
    expect(fixture.cssQuery('#incompleteTodo .completed')).toBeNull();
    expect(fixture.cssQuery('#completeTodo')).not.toBeNull();
    expect(fixture.cssQuery('#completeTodo .completed')).not.toBeNull();
  });

  it('should complete todo', async(() => {
    fixture.clickButton('#incompleteTodo mat-checkbox input');

    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('#incompleteTodo .completed')).not.toBeNull();
    });
  }));

  it('should remove todo', async(() => {
    fixture.clickButton('#incompleteTodo editable-name-item button:nth-of-type(1)');

    fixture.whenStable().then(() => {
      let todos : HTMLDivElement = fixture.nativeElement.querySelector('.todos');
      expect(todos.querySelector('#incompleteTodo')).toBeNull();
    })
  }));

  it('should search for todo', () => {
    fixture.setInputValue('.search mat-form-field input', 'complete');
    expect(fixture.cssQuery('#incompleteTodo')).toBeNull();
    expect(fixture.cssQuery('#completeTodo')).not.toBeNull();
  });

  it('should add new todo', () => {
    fixture.setInputValue('.add-new-item mat-form-field input', 'newItem');
    fixture.clickButton('.add-new-item button');
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('#newItem')).not.toBeNull();
    });
  });
});
