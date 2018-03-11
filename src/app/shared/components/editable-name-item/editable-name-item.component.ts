import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {NameChangeEvent} from "../../classes/name-change-event";

@Component({
  selector: 'editable-name-item',
  templateUrl: './editable-name-item.component.html',
  styleUrls: ['./editable-name-item.component.css']
})
export class EditableNameItemComponent implements OnInit {

  @Input() public id : string = '';
  @Input() public name : string = '';
  @Output() public onNameUpdate = new EventEmitter<NameChangeEvent>();
  @Output() public onItemClicked = new EventEmitter<string>();
  protected nameBeforeEdit : string = null;

  constructor() { }

  ngOnInit() {
  }

  public editName() : void {
    this.nameBeforeEdit = this.name;
  }

  public isCurrentlyEdited() : boolean {
    return this.nameBeforeEdit !== null;
  }

  public updateName() : void {
    if (this.nameChangedAndNotEmpty()) {
      this.onNameUpdate.emit(new NameChangeEvent(this.id, this.name));
    } else {
      this.rollbackName();
    }
    this.stopEditing();
  }

  public cancelNameEdit() : void {
    this.rollbackName();
    this.stopEditing();
  }

  @HostListener('click')
  public onClick() : void {
    this.onItemClicked.emit(this.id);
  }

  private nameChangedAndNotEmpty() : boolean {
    return this.name != this.nameBeforeEdit && this.name != '';
  }

  private rollbackName() : void {
    this.name = this.nameBeforeEdit;
  }

  private stopEditing() : void {
    this.nameBeforeEdit = null;
  }



}
