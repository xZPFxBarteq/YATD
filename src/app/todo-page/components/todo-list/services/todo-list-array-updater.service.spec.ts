import {TestBed, inject} from '@angular/core/testing';

import {TodoListArrayUpdaterService} from './todo-list-array-updater.service';
import {TodoList} from "../classes/todo-list";

describe('TodoListArrayUpdaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [TodoListArrayUpdaterService]
    });
  });

  it('should be created', inject([TodoListArrayUpdaterService], (service : TodoListArrayUpdaterService) => {
    expect(service).toBeTruthy();
  }));

  it('should place new list at end', inject([TodoListArrayUpdaterService], (service : TodoListArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : TodoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list', inject([TodoListArrayUpdaterService], (service : TodoListArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : TodoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list when one list was removed on server', inject([TodoListArrayUpdaterService], (service : TodoListArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a')];

    //when
    let todoLists : TodoList[] = service.updateList(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('c')]);
  }));

  function todoList(name : string) : TodoList {
    let todoList : TodoList = new TodoList();
    todoList.name = name;
    return todoList;
  }
});
