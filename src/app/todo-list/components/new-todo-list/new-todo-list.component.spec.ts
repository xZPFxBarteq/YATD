import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToDoListComponent } from './new-todo-list.component';

describe('NewToDoListComponent', () => {
  let component: NewToDoListComponent;
  let fixture: ComponentFixture<NewToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewToDoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
