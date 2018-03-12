import { NameSearchPipe } from './name-search.pipe';
import {TodoList} from "../../todo-page/components/todo-list/classes/todo-list";
import {Todo} from "../../todo-page/components/todo/classes/todo";

describe('NameSearchPipe', () => {

  const pipe = new NameSearchPipe();

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

  it('should filter by todo name', () => {
    //given
    let todos : Todo[] = [todo('abc'), todo('def'),  todo('ab')];
    //when
    let filteredTodos : Todo[] = pipe.transform(todos, 'a');
    //then
    expect(filteredTodos).toEqual([todo('abc'), todo('ab')]);
  });


  function todoList(name : string) : TodoList {
    let list : TodoList = new TodoList();
    list.name = name;
    return list;
  }

  function todo(name : string) : Todo {
    let todo : Todo = new Todo();
    todo.name = name;
    return todo;
  }

});
