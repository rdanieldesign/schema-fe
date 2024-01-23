import { TestBed } from '@angular/core/testing';

import { EntityLabelService } from './entity-label.service';

describe('EntityLabelService', () => {
  let service: EntityLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
