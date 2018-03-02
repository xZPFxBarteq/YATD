import { TestBed, inject } from '@angular/core/testing';

import { ToDoRepositoryService } from './to-do-repository.service';

describe('ToDoRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoRepositoryService]
    });
  });

  it('should be created', inject([ToDoRepositoryService], (service: ToDoRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
