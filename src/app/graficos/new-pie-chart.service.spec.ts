import { TestBed } from '@angular/core/testing';

import { NewPieChartService } from './new-pie-chart.service';

describe('NewPieChartService', () => {
  let service: NewPieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
