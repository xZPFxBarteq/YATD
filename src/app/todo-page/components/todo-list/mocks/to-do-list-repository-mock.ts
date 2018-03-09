import {Observable} from "rxjs/Observable";
import {TodoList} from "../classes/todo-list";
import 'rxjs/add/observable/of';
import * as _ from "lodash";

export class ToDoListRepositoryMock {

  private lists : TodoList[] = [
    this.newToDoList('existingTestList')
  ];

  public getAllLists() : Observable<TodoList[]> {
    return Observable.of(this.lists);
  }

  public addNewList(name : string) : Observable<TodoList> {
    let newList : TodoList = this.newToDoList(name);
    this.lists.push(newList);
    return Observable.of(newList);
  }

  public updateListName(id : string, newName : string) : Observable<TodoList> {
    let editedList = _.find(this.lists, ['id', id]);
    editedList.name = newName;
    return Observable.of(editedList);
  }

  public removeList(id : string) : Observable<void> {
    _.remove(this.lists, ['id', id]);
    return Observable.of(null);
  }

  private newToDoList(name : string) : TodoList {
    let list : TodoList = new TodoList();
    list.id = name;
    list.name = name;
    return list;
  }

}
