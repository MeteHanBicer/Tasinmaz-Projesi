import { TestBed } from '@angular/core/testing';

import { CascadingService } from './cascading.service';

describe('CascadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CascadingService = TestBed.get(CascadingService);
    expect(service).toBeTruthy();
  });
});
