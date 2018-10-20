import { TestBed } from '@angular/core/testing';

import { LeafletDisplayerService } from './leaflet-displayer.service';

describe('MapDisplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeafletDisplayerService = TestBed.get(LeafletDisplayerService);
    expect(service).toBeTruthy();
  });
});
