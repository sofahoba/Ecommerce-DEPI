import { TestBed } from '@angular/core/testing';

import { FakeStoreService } from './fake-store.service';

describe('FakeStoreService', () => {
  let service: FakeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
