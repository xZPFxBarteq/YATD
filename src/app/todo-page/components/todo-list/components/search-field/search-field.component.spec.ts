import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchFieldComponent} from './search-field.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../../../modules/material.module";
import {By} from "@angular/platform-browser";

describe('SearchFieldComponent', () => {
  let component : SearchFieldComponent;
  let fixture : ComponentFixture<SearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [SearchFieldComponent],
      imports : [MaterialModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind input to searchedValue', () => {
    //when
    setInputValue('.search mat-form-field input', 'test');
    //then
    expect(component.searchedValue).toEqual('test');
  });

  it('should clear input after clear button has been pressed', () => {
    //given
    setInputValue('.search mat-form-field input', 'test');
    //when
    cssQuery('.search button').click();
    //then
    expect(component.searchedValue).toEqual('');
  });

  function cssQuery(css : string) : any {
    return fixture.debugElement.query(By.css(css)).nativeElement;
  }

  function setInputValue(inputSelector : string, value : string) : void {
    let input : HTMLInputElement = cssQuery(inputSelector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

});
