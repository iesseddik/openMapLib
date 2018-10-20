import { TestBed } from '@angular/core/testing';

import { LeafletViewSetterService } from './leaflet-view-setter.service';

describe('MapViewSetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeafletViewSetterService = TestBed.get(LeafletViewSetterService);
    expect(service).toBeTruthy();
  });
});
