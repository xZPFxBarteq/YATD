import {Component, OnInit} from '@angular/core';
import {TodoCompletionFilter} from "../../classes/todo-completion-filter.enum";

@Component({
  selector : 'todo-list-filtering',
  templateUrl : './todo-list-filtering.component.html',
  styleUrls : ['./todo-list-filtering.component.css']
})
export class TodoListFilteringComponent implements OnInit {

  protected filterOptions : TodoCompletionFilter[] = [
    TodoCompletionFilter.ALL,
    TodoCompletionFilter.ONLY_COMPLETE,
    TodoCompletionFilter.ONLY_INCOMPLETE
  ];
  public chosenFilter : TodoCompletionFilter = TodoCompletionFilter.ALL;

  constructor() {
  }

  ngOnInit() {
  }

}
