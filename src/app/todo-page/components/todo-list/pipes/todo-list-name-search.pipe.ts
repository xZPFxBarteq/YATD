import { Pipe, PipeTransform } from '@angular/core';
import {TodoList} from "../classes/todo-list";
import * as _ from "lodash";
import {Todo} from "../../todo/classes/todo";

@Pipe({
  name: 'todoListNameSearch'
})
export class TodoListNameSearchPipe implements PipeTransform {

  transform(filteredArray: TodoList[] | Todo[], searchName: string): any {
    return _.filter(filteredArray, (element : TodoList | Todo) => _.startsWith(_.toLower(element.name), _.toLower(searchName)));
  }

}
