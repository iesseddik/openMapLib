import { Component, OnInit } from '@angular/core';

// LEAFLETng lint
import * as L from 'leaflet';

// SERVICES
import { PlaceService } from '../services/place.service';
import { LeafletDisplayerService } from '../services/leaflet-displayer.service';
import { LeafletViewSetterService } from '../services/leaflet-view-setter.service';



// const customTileLayer1: L.TileLayer = L.tileLayer(
//  "https://{s}.planet.com/basemaps/v1/planet-tiles/global_monthly_2016_05_mosaic/
//  gmap/{x}/{y}/{z}.png?api_key=a3a57cb4fe0341a2afa9b8ab5905ed39")

@Component({
  selector: 'app-leaflet-canvas',
  templateUrl: './leaflet-canvas.component.html',
  styleUrls: ['./leaflet-canvas.component.css']
})
export class LeafletCanvasComponent implements OnInit {
  private mapCanvas: L.Map;
  private markerGroup: L.FeatureGroup;

  constructor(
    private mapDisplayerService: LeafletDisplayerService,
    private placeService: PlaceService,
    private viewSetterService: LeafletViewSetterService
  ) {
    this.markerGroup = new L.FeatureGroup();
  }

  ngOnInit() {
    const osmLayer: L.TileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Leaflet&Angular' });

    // SEE PLANET WMTS @ : https://developers.planet.com/docs/api/tile-services/
    this.mapCanvas = L.map('map', { zoomControl: false }).setView([0, 0], 1);
    osmLayer.addTo(this.mapCanvas); // applying tile

    this.mapDisplayerService.markerGroupSubject.subscribe(markerGroup => {
      this.mapCanvas.removeLayer(this.markerGroup);
      this.markerGroup = markerGroup;
      this.markerGroup.addTo(this.mapCanvas);
    });

    this.placeService.getPlaces().subscribe(places => {
      places.forEach(p => this.mapDisplayerService.addPlaceToList(p));
    });

    this.viewSetterService.viewerBounds$.subscribe(vb => this.mapCanvas.flyToBounds(vb));

  }

}
