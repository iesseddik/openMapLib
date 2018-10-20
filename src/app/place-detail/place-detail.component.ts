// Angular
import { Component, OnInit, Input } from '@angular/core';

// Routing
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


// Place
import { Place } from '../model/Place';

// Services
import { PlaceService } from '../services/place.service';
import { LeafletViewSetterService } from '../services/leaflet-view-setter.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  place: Place;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private location: Location,
    private mapViewSetterService: LeafletViewSetterService
    ) { }

  ngOnInit(): void {
    this.getPlace();
  }

  getPlace(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.placeService.getPlace(id)
      .subscribe(place => {
        this.place = place;
        this.mapViewSetterService.setViewerBounds([place] );
      });
  }

  save(): void {
    this.placeService.updatePlace(this.place)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
