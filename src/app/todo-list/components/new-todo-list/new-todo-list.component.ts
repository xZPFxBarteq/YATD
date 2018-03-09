import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToDoListRepositoryService} from "../../services/to-do-list-repository.service";

@Component({
  selector: 'new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.css']
})
export class NewToDoListComponent implements OnInit {

  protected newListName : string = '';
  @Output() protected onNewListAdded = new EventEmitter<void>();

  constructor(private todoListRepository : ToDoListRepositoryService) { }

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
