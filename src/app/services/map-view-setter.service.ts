import { Injectable } from '@angular/core';

// LEAFLET
import * as L from 'leaflet';
import { Subject, BehaviorSubject } from 'rxjs';
import { MapDisplayerService } from './map-displayer.service';
import { IDisplayedPlace } from '../model/intf/IDisplayedPlace';

@Injectable({
  providedIn: 'root'
})
export class MapViewSetterService {
  viewerBounds$:BehaviorSubject<L.LatLngBounds>;
  private viewerBounds: L.LatLngBounds;

  constructor(private mapDisplayerService: MapDisplayerService) {
    this.viewerBounds = L.latLngBounds([-80, 80], [80, -80]);
    
    this.viewerBounds$ = new BehaviorSubject<L.LatLngBounds>(Object.assign(this.viewerBounds));
    this.mapDisplayerService.markerGroupSubject.subscribe(markerGrp => {
      if (markerGrp.getBounds().isValid()) {
        this.viewerBounds = markerGrp.getBounds().pad(0.5) ;
        this.emitViewerBoundsSubject()
      }
      else{
        console.log("Invalid LatLonBound ")
      }

    })
  }

  private emitViewerBoundsSubject(){
    this.viewerBounds$.next(this.viewerBounds)
  }

  setViewerBounds(featureGrp:L.FeatureGroup ){
    this.viewerBounds = featureGrp.getBounds()
    this.emitViewerBoundsSubject()
  }



}
