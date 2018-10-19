import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { Place } from '../model/Place';

import { MessageService } from './message.service';
import { MapDisplayerService } from './map-displayer.service';

// Other Services

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'api/places';  // URL to web api

  constructor( private http: HttpClient,
    private messageService: MessageService,
    private mapDisplayerService: MapDisplayerService
    ) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl).pipe(
      tap(places => {
        this.log('fetched places');
        this.mapDisplayerService.clearPlacesList();
        places.forEach(p => this.mapDisplayerService.addPlaceToList(p));
        // ToDo : setview on bbox
        }
      ),

      catchError(this.handleError('getPlaces', []))
    );
  }


  /** GET place by id. Will 404 if id not found */
  getPlace(id: number): Observable<Place> {
    const url = `${this.placesUrl}/${id}`;
    return this.http.get<Place>(url).pipe(
      tap(_ => {
        this.log(`fetched place id=${id}`);
        // Show the place on map : this.mapDisplayerService...
      }),
      catchError(this.handleError<Place>(`getPlace id=${id}`))
    );
  }

  /** PUT: update the Place on the server */
  updatePlace(place: Place): Observable<any> {
    return this.http.put(this.placesUrl, place, httpOptions).pipe(
      tap(_ => {
        this.log(`updated place id=${place.id}`);
        this.mapDisplayerService.removePlaceFromList(place.id);
        this.mapDisplayerService.addPlaceToList(place);
      }),
      catchError(this.handleError<any>('updatePlace'))
    );
  }

  /** POST: add a new place to the server */
  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, place, httpOptions).pipe(
      tap((b: Place) => {
        this.log(`added place w/ id=${b.id}`);
      }),
      catchError(this.handleError<Place>('addPlace'))
    );
  }

  /** DELETE: delete the place from the server */
  deletePlace(place: Place | number): Observable<Place> {
    const id = typeof place === 'number' ? place : place.id;
    const url = `${this.placesUrl}/${id}`;

    return this.http.delete<Place>(url, httpOptions).pipe(
      tap(_ => {
        this.log(`deleted place id=${id}`);
        this.mapDisplayerService.removePlaceFromList(id);
      }),
      catchError(this.handleError<Place>('deletePlace'))
    );
  }

  /* GET places whose name contains search term */
  searchPlaces(term: string): Observable<Place[]> {
    if (!term.trim()) {
      // if not search term, return empty place array.
      return of([]);
    }
    return this.http.get<Place[]>(`${this.placesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found places matching "${term}"`)),
      catchError(this.handleError<Place[]>('searchPlaces', []))
    );
  }

  /** Log a PlaceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`placeService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
