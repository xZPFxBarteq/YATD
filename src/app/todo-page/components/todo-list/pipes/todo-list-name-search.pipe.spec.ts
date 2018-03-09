import { TodoListNameSearchPipe } from './todo-list-name-search.pipe';
import {TodoList} from "../classes/todo-list";

describe('TodoListNameSearchPipe', () => {

  const pipe = new TodoListNameSearchPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter by list name', () => {
    //given
    let lists : TodoList[] = [todoList('abc'), todoList('def'),  todoList('ab')];
    //when
    let filteredLists : TodoList[] = pipe.transform(lists, 'a');
    //then
    expect(filteredLists).toEqual([todoList('abc'), todoList('ab')]);
  });


  function todoList(name : string) : TodoList {
    let list : TodoList = new TodoList();
    list.name = name;
    return list;
  }

});
