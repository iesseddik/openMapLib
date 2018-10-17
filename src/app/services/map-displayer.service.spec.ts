import { TestBed } from '@angular/core/testing';

import { MapDisplayerService } from './map-displayer.service';

describe('MapDisplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapDisplayerService = TestBed.get(MapDisplayerService);
    expect(service).toBeTruthy();
  });
});
