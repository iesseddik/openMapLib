import { Component, OnInit } from '@angular/core';

// OPENLAYERS
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';


@Component({
  selector: 'app-ol-canvas',
  templateUrl: './ol-canvas.component.html',
  styleUrls: ['./ol-canvas.component.css']
})
export class OlCanvasComponent implements OnInit {
  
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

}
