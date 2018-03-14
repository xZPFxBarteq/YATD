import {TestBed, inject} from '@angular/core/testing';

import {ArrayUpdaterService} from './array-updater.service';
import {TodoList} from "../../todo-page/components/todo-lists/classes/todo-list";

describe('ArrayUpdaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [ArrayUpdaterService]
    });
  });

  it('should be created', inject([ArrayUpdaterService], (service : ArrayUpdaterService) => {
    expect(service).toBeTruthy();
  }));

  it('should place new list at end', inject([ArrayUpdaterService], (service : ArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : TodoList[] = service.update(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list', inject([ArrayUpdaterService], (service : ArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a'), todoList('b')];

    //when
    let todoLists : TodoList[] = service.update(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('b'), todoList('c')]);
  }));

  it('should maintain order of current list when one list was removed on server', inject([ArrayUpdaterService], (service : ArrayUpdaterService) => {
    //given
    let currentLists : TodoList[] = [todoList('a'), todoList('b'), todoList('c')];
    let listsFromServer : TodoList[] = [todoList('c'), todoList('a')];

    //when
    let todoLists : TodoList[] = service.update(currentLists, listsFromServer);

    //then
    expect(todoLists).toEqual([todoList('a'), todoList('c')]);
  }));

  function todoList(name : string) : TodoList {
    let todoList : TodoList = new TodoList();
    todoList.name = name;
    return todoList;
  }
});
