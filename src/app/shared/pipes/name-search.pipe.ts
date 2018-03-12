import { Pipe, PipeTransform } from '@angular/core';
import {TodoList} from "../../todo-page/components/todo-list/classes/todo-list";
import * as _ from "lodash";
import {Todo} from "../../todo-page/components/todo/classes/todo";

@Pipe({
  name: 'nameSearch'
})
export class NameSearchPipe implements PipeTransform {

  transform(filteredArray: TodoList[] | Todo[], searchName: string): any {
    return _.filter(filteredArray, (element : TodoList | Todo) => _.startsWith(_.toLower(element.name), _.toLower(searchName)));
  }

}
