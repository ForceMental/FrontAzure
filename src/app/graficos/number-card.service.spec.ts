import { TestBed } from '@angular/core/testing';

import { NumberCardService } from './number-card.service';

describe('NumberCardService', () => {
  let service: NumberCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
