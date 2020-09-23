import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedchangesGuard } from './unsavedchanges.guard';

describe('UnsavedchangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedchangesGuard]
    });
  });

  it('should ...', inject([UnsavedchangesGuard], (guard: UnsavedchangesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
