import { Injectable } from '@angular/core';

// LEAFLET
import * as L from 'leaflet';
import { Subject, BehaviorSubject } from 'rxjs';
import { LeafletDisplayerService } from './leaflet-displayer.service';
import { IDisplayedPlace } from '../model/intf/ILDisplayedPlace';
import { Place } from '../model/Place';

const defaultBounds: L.LatLngBounds = L.latLngBounds([-80, 80], [80, -80]);

@Injectable({
  providedIn: 'root'
})
export class LeafletViewSetterService {
  viewerBounds$: BehaviorSubject<L.LatLngBounds>;
  private viewerBounds: L.LatLngBounds;

  constructor(private mapDisplayerService: LeafletDisplayerService) {
    this.viewerBounds = defaultBounds;

    this.viewerBounds$ = new BehaviorSubject<L.LatLngBounds>(Object.assign(this.viewerBounds));
    this.mapDisplayerService.markerGroupSubject.subscribe(markerGrp => {
      if (markerGrp.getBounds().isValid()) {
        this.viewerBounds = markerGrp.getBounds().pad(0.5);
        this.emitViewerBoundsSubject();
      } else {
        console.log('Invalid LatLonBound');
      }

    });
  }

  private emitViewerBoundsSubject() {
    this.viewerBounds$.next(this.viewerBounds);
  }

  setViewerBounds(places: Place[]) {
    if (places.length > 0) {
      this.viewerBounds = new L.LatLngBounds(places.map(place => place.localization));
      console.log(this.viewerBounds.isValid());
    }
    this.emitViewerBoundsSubject();
  }

}
