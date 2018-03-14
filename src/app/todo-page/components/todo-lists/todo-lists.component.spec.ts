import {async, TestBed} from '@angular/core/testing';

import {TodoListsComponent} from './todo-lists.component';
import {TodoListsRepositoryService} from "./services/todo-lists-repository.service";
import {ArrayUpdaterService} from "../../../shared/services/array-updater.service";
import {TodoListsRepositoryMock} from "./mocks/todo-lists-repository-mock";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../../shared/classes/todo-fixture";
import {SearchFieldComponent} from "../../../shared/components/search-field/search-field.component";
import {EditableNameItemComponent} from "../../../shared/components/editable-name-item/editable-name-item.component";
import {NameSearchPipe} from "../../../shared/pipes/name-search.pipe";

describe('TodoListsComponent', () => {
  let component : TodoListsComponent;
  let fixture : TodoFixture<TodoListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [TodoListsComponent, SearchFieldComponent, EditableNameItemComponent, NameSearchPipe],
      imports : [MaterialModule, FormsModule],
      providers : [
        {provide : TodoListsRepositoryService, useClass : TodoListsRepositoryMock},
        {provide : ArrayUpdaterService, useClass : ArrayUpdaterService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<TodoListsComponent>(TestBed.createComponent(TodoListsComponent));
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
