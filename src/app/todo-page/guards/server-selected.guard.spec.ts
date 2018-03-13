import { TestBed, async, inject } from '@angular/core/testing';

import { ServerSelectedGuard } from './server-selected.guard';

describe('ServerSelectedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerSelectedGuard]
    });
  });

  it('should ...', inject([ServerSelectedGuard], (guard: ServerSelectedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
