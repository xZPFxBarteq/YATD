import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodoListRepositoryService} from "../todo-list/services/todo-list-repository.service";

@Component({
  selector: 'new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.css']
})
export class NewTodoListComponent implements OnInit {

  protected newListName : string = '';
  @Output() public onNewListAdded = new EventEmitter<void>();

  constructor(private todoListRepository : TodoListRepositoryService) { }

  ngOnInit() {
  }

  addNewList() : void {
    this.todoListRepository.addNewList(this.newListName).subscribe(() => {
      this.newListName = '';
      this.onNewListAdded.emit();
    });
  }

  newListNameIsEmpty() : boolean {
    return this.newListName == '';
  }

}
