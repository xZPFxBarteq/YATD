import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from "../classes/todo";
import {TodoCompletionFilter} from "../classes/todo-completion-filter.enum";
import * as _ from "lodash";

@Pipe({
  name : 'filterByCompletion'
})
export class FilterByCompletionPipe implements PipeTransform {

  transform(todos : Todo[], completionFilter : TodoCompletionFilter) : Todo[] {
    switch (completionFilter) {
      case TodoCompletionFilter.ALL:
        return todos;
      case TodoCompletionFilter.ONLY_COMPLETE:
        return _.filter(todos, ['is_complete', true]);
      case TodoCompletionFilter.ONLY_INCOMPLETE:
        return _.filter(todos, ['is_complete', false]);
    }
  }

}
