import { TestBed } from '@angular/core/testing';

import { logservice} from './logservice';

describe('LogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: logservice = TestBed.get(logservice);
    expect(service).toBeTruthy();
  });
});
