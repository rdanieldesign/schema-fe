import { TestBed } from '@angular/core/testing';

import { EntityValueService } from './entity-value.service';

describe('EntityValueService', () => {
  let service: EntityValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
