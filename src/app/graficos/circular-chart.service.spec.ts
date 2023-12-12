import { TestBed } from '@angular/core/testing';

import { CircularChartService } from './circular-chart.service';

describe('ChartConfigService', () => {
  let service: CircularChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircularChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
