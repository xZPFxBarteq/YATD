import {FilterByCompletionPipe} from './filter-by-completion.pipe';
import {Todo} from "../classes/todo";
import {TodoCompletionFilter} from "../classes/todo-completion-filter.enum";

describe('FilterByCompletionPipe', () => {
  let pipe = new FilterByCompletionPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all', () => {
    //given
    let todos : Todo[] = [todo(true), todo(false)];
    //when
    let filtered : Todo[] = pipe.transform(todos, TodoCompletionFilter.ALL);
    //then
    expect(filtered).toEqual([todo(true), todo(false)]);
  });

  it('should return complete', () => {
    //given
    let todos : Todo[] = [todo(true), todo(false)];
    //when
    let filtered : Todo[] = pipe.transform(todos, TodoCompletionFilter.ONLY_COMPLETE);
    //then
    expect(filtered).toEqual([todo(true)]);
  });

  it('should return incomplete', () => {
    //given
    let todos : Todo[] = [todo(true), todo(false)];
    //when
    let filtered : Todo[] = pipe.transform(todos, TodoCompletionFilter.ONLY_INCOMPLETE);
    //then
    expect(filtered).toEqual([todo(false)]);
  });

  function todo(isComplete : boolean) : Todo {
    let todo : Todo = new Todo();
    todo.is_complete = isComplete;
    return todo;
  }
});
