import { TestBed } from '@angular/core/testing';

import { MapViewSetterService } from './map-view-setter.service';

describe('MapViewSetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapViewSetterService = TestBed.get(MapViewSetterService);
    expect(service).toBeTruthy();
  });
});
