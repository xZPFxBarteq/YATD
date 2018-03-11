import {async, TestBed} from '@angular/core/testing';

import {SearchFieldComponent} from './search-field.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../modules/material.module";
import {TodoFixture} from "../../classes/todo-fixture";

describe('SearchFieldComponent', () => {
  let component : SearchFieldComponent;
  let fixture : TodoFixture<SearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [SearchFieldComponent],
      imports : [MaterialModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = new TodoFixture<SearchFieldComponent>(TestBed.createComponent(SearchFieldComponent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind input to searchedValue', () => {
    //when
    fixture.setInputValue('.search mat-form-field input', 'test');
    //then
    expect(component.searchedValue).toEqual('test');
  });

  it('should clear input after clear button has been pressed', () => {
    //given
    fixture.setInputValue('.search mat-form-field input', 'test');
    //when
    fixture.cssQuery('.search button').clickButton();
    //then
    expect(component.searchedValue).toEqual('');
  });

});
