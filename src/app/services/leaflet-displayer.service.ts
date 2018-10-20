// ANGULAR
import { Injectable } from '@angular/core';

// MODEL
import { Place } from '../model/Place';

// RxJS
import { Subject } from 'rxjs';

// LEAFLET
import * as L from 'leaflet';

// MODEL
import { IDisplayedPlace } from '../model/intf/ILDisplayedPlace';
import { DisplayedPlace } from '../model/LDisplayedPlace';

const defaultIcon: L.Icon = L.icon({
  iconUrl: '../assets/default-location-icon.png',
  iconSize: [20, 30],
  iconAnchor: [10, 30],
  popupAnchor: [0, -26],
});


@Injectable({
  providedIn: 'root'
})
export class LeafletDisplayerService {
  markerGroupSubject: Subject<L.FeatureGroup>;
  private markersGroup: L.FeatureGroup;
  private displayedPlaces: IDisplayedPlace[];

  constructor() {
    this.markerGroupSubject = new Subject<L.FeatureGroup>();
    this.markersGroup = new L.FeatureGroup();
    this.displayedPlaces = [];
  }

  private emitMarkerGroupSubject() {
    this.markerGroupSubject.next(Object.assign(this.markersGroup));
  }

  addPlaceToList(place: Place): void {
    if (place.localization.length === 2) {
      const placeMarker = this.createPlaceMarker(place);
      this.markersGroup.addLayer(placeMarker);
      this.displayedPlaces.push(new DisplayedPlace(place, this.markersGroup.getLayerId(placeMarker)) );
      this.emitMarkerGroupSubject();
    }
  }

  removePlaceFromList(placeID: number): void {
    // remove markerbymarker_id & remove displayedplace from list
    const displayedLocation = this.displayedPlaces
      .find(dl => dl.place.id === placeID);
    if (displayedLocation) {
      this.markersGroup.removeLayer(displayedLocation.marker_id);
      this.displayedPlaces = this.displayedPlaces.filter(dl =>
        dl.place.id !== placeID);
      this.emitMarkerGroupSubject();
    } else { console.log(`No place identified ${placeID} in displayed Loc[] `);
   }
  }

  clearPlacesList(): void {
    this.markersGroup.clearLayers() ;
    this.displayedPlaces = [];
    this.emitMarkerGroupSubject();
  }

  createPlaceMarker(place: Place, icon?: L.Icon): L.Marker {
    const markerIcon = icon ? icon : defaultIcon;
    return new L.Marker(
      new L.LatLng(place.localization[0], place.localization[1]),
      { icon: markerIcon }
    ).bindPopup(place.name) ;
  }


}

