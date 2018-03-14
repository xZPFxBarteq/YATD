import {async, TestBed} from '@angular/core/testing';

import {EditableNameItemComponent} from './editable-name-item.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../classes/todo-fixture";
import {NameChangeEvent} from "../../classes/name-change-event";

describe('EditableNameItemComponent', () => {
  let component : EditableNameItemComponent;
  let fixture : TodoFixture<EditableNameItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [EditableNameItemComponent],
      imports : [MaterialModule, FormsModule]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<EditableNameItemComponent>(TestBed.createComponent(EditableNameItemComponent));
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name if not in edit mode', () => {
    //when
    component.name = 'test';
    fixture.detectChanges();

    //then
    expect(fixture.cssQuery('.name-label').textContent).toEqual('test');
  });

  it('should display input with name as value in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit mat-form-field input').value).toEqual('test');
    });
  });

  it('should display remove button', () => {
    //when
    fixture.detectChanges();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.editable-name-item button:nth-child(1)')).not.toBeNull();
    });
  });

  it('should display edit button', () => {
    //when
    fixture.detectChanges();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.editable-name-item button:nth-child(2)')).not.toBeNull();
    });
  });

  it('should display accept button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit button:nth-child(2)')).not.toBeNull();
    });
  });

  it('should display cancel button in edit mode', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      expect(fixture.cssQuery('.name-edit button:nth-child(3)')).not.toBeNull();
    });
  });

  it('should update name', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedTest');
      fixture.clickButton('.name-edit button:nth-child(2)');
      expect(fixture.cssQuery('.name-label').textContent).toEqual('changedTest');
    });
  });

  it('should revert name when cancel is clicked', () => {
    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedTest');
      fixture.clickButton('.name-edit button:nth-child(3)');
      expect(fixture.cssQuery('.name-label').textContent).toEqual('test');
    });
  });

  it('should emit event when name update has been accepted', () => {
    //given
    let id : string;
    let updatedName : string;
    component.onNameUpdate.subscribe((event : NameChangeEvent) => {
      id = event.id;
      updatedName = event.name;
    });

    //when
    enterEditMode();

    //then
    fixture.whenStable().then(() => {
      fixture.setInputValue('.name-edit mat-form-field input', 'changedTest');
      fixture.clickButton('.name-edit button:nth-child(2)');
      expect(id).toEqual('testId');
      expect(updatedName).toEqual('changedTest');
    });
  });

  it('should emit event after item remove', () => {
    //given
    let idToRemove : string;
    component.id = 'testId';
    component.onRemove.subscribe((id : string) => {
      idToRemove = id;
    });

    //when
    fixture.detectChanges();
    fixture.clickButton('.editable-name-item button:nth-child(1)');
    fixture.whenStable().then(() => {
      expect(idToRemove).toEqual('testId');
    });
  });

  it('should emit event after component has been clicked', () => {
    //given
    let clickedItemId : string;
    component.id = 'testId';
    component.onItemClicked.subscribe((id : string) => {
      clickedItemId = id;
    });

    //when
    fixture.detectChanges();
    component.onClick(fixture.cssQuery('.name-label').classList);

    //then
    fixture.whenStable().then(() => {
      expect(clickedItemId).toEqual('testId');
    });
  });

  function enterEditMode() : void {
    component.id = 'testId';
    component.name = 'test';
    fixture.clickButton('.editable-name-item button:nth-child(2)');
    fixture.detectChanges();
  }

});

