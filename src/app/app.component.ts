import { Component, OnInit, OnDestroy } from '@angular/core';
import { libViews } from './model/enum/libViews';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  libView: libViews;

  constructor() { }

  ngOnInit() {
    this.libView = libViews.LEAFLET
  }

  setMapLibTo(selectedLibView: libViews){
    console.log(selectedLibView)
    if (selectedLibView === libViews.LEAFLET){
      this.libView = libViews.LEAFLET
    }
    else{
      this.libView = libViews.OL

    }
  }

}
