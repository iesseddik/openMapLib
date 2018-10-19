import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './services/in-memory-data.service';

// external package
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PlaceSearchComponent } from './place-search/place-search.component';
import { LeafletCanvasComponent } from './leaflet-canvas/leaflet-canvas.component';
import { OlCanvasComponent } from './ol-canvas/ol-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    PlaceDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PlaceSearchComponent,
    LeafletCanvasComponent,
    OlCanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
