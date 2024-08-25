import { TestBed } from '@angular/core/testing';

import { EffortsService } from './efforts.service';

describe('EffortsService', () => {
  let service: EffortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
