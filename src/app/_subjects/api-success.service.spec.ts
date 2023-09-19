import { TestBed } from '@angular/core/testing';

import { ApiSuccessService } from './api-success.service';

describe('ApiSuccessService', () => {
  let service: ApiSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
