import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListNameHeaderComponent } from './todo-list-name-header.component';

describe('TodoListNameHeaderComponent', () => {
  let component: TodoListNameHeaderComponent;
  let fixture: ComponentFixture<TodoListNameHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListNameHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListNameHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
