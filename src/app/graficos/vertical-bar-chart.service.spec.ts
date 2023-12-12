import { TestBed } from '@angular/core/testing';

import { VerticalBarChartService } from './vertical-bar-chart.service';

describe('VerticalBarChartService', () => {
  let service: VerticalBarChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerticalBarChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
