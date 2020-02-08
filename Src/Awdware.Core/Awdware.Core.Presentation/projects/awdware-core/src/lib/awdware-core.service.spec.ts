import { TestBed } from '@angular/core/testing';

import { AwdwareCoreService } from './awdware-core.service';

describe('AwdwareCoreService', () => {
  let service: AwdwareCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwdwareCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
