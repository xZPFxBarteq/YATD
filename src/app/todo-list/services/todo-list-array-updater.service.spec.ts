import { TestBed, inject } from '@angular/core/testing';

import { TodoListArrayUpdaterService } from './todo-list-array-updater.service';
import {ToDoList} from "../classes/to-do-list";

describe('TodoListArrayUpdaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListArrayUpdaterService]
    });
  });

  it('should be created', inject([TodoListArrayUpdaterService], (service: TodoListArrayUpdaterService) => {
    expect(service).toBeTruthy();
  }));

  it('should place new list at end', inject([TodoListArrayUpdaterService], (service: TodoListArrayUpdaterService) => {
    //given
    let currentLists : ToDoList[] = [todoList('a'), todoList('b')];
    let listsFromServer : ToDoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : ToDoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list', inject([TodoListArrayUpdaterService], (service: TodoListArrayUpdaterService) => {
    //given
    let currentLists : ToDoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : ToDoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : ToDoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list when one list was removed on server', inject([TodoListArrayUpdaterService], (service: TodoListArrayUpdaterService) => {
    //given
    let currentLists : ToDoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : ToDoList[] = [todoList('c'), todoList('a')];

    //when
    let todoLists : ToDoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('c')]);
  }));

  function todoList(name : string) : ToDoList {
    let todoList : ToDoList = new ToDoList();
    todoList.name = name;
    return todoList;
  }
});
