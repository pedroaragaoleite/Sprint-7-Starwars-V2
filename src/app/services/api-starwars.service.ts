import { Injectable } from '@angular/core';
import { StarshipResults } from '../interfaces/starship-data';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, map, tap, catchError, BehaviorSubject, elementAt } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiStarwarsService {
  private shipSource = new BehaviorSubject<any>(null);
  currentShip = this.shipSource.asObservable();

  private shipImageUrl = new BehaviorSubject<string | null>(null);
  currentShipUrl = this.shipImageUrl.asObservable();

  private filmImagesUrl = new BehaviorSubject<string[]>([]);
  currentFilmUrl = this.filmImagesUrl.asObservable();

  private pilotImagesUrl = new BehaviorSubject<string[]>([]);
  currentPilotUrl = this.pilotImagesUrl.asObservable();

  constructor(private http: HttpClient) { }

  getShipsList(currentPage: number): Observable<StarshipResults> {
    let result = this.http.get<StarshipResults>(`${environment.apiUrl}${currentPage}`)
    return result
  }

  // recibe el ship del component
  getShip(ship: any, id: number) {
    this.getShipImage(id); 
    this.shipSource.next(ship);
    // console.log(ship.films);
    
  }

  getFilms(ship: any, id: number) {
    let shipArray:any = [];   
    ship.films.forEach((film:any) => {
      let filmId = film.match(/\/(\d+)\/$/);
      shipArray.push(filmId[1]);     } )
    this.getFilmsImage(shipArray);
  }

  getPilots(ship: any, id: number) {
    let shipArray:any = [];   
    ship.pilots.forEach((pilot:any) => {
      // console.log(pilot);
      
      let pilotId = pilot.match(/\/(\d+)\/$/);
      shipArray.push(pilotId[1]);     } )
    this.getPilotsImage(shipArray);

    this.resetPilotImages();
  }

  resetPilotImages () {
    this.pilotImagesUrl.next([]);
  }

  getPilotsImage(shipArray:any) {
    shipArray.forEach((element:number) => {
      this.http.get(`${environment.apiImg}/characters/${element}.jpg`, {responseType: 'blob' })
    .pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('La imagen no existe en la Api');
        return of('../../../assets/images/image-not-found.png');
      })
    )
    .subscribe(pilotUrl => {
      let pilotsArray = [...this.pilotImagesUrl.value, pilotUrl]
      // console.log(pilotsArray);
      
      this.pilotImagesUrl.next(pilotsArray);
    });
    })
  }

  getFilmsImage(shipArray:any) {   
    shipArray.forEach((element:number) => {
      this.http.get(`${environment.apiImg}/films/${element}.jpg`, {responseType: 'blob' })
    .pipe(
      map(blob => URL.createObjectURL(blob)),
      catchError(error => {
        console.error('La imagen no existe en la Api');
        return of('../../../assets/images/image-not-found.png');
      })
    )
    .subscribe(filmUrl => {
      const filmsArray = [...this.filmImagesUrl.value, filmUrl]
      // console.log(filmsArray);
      
      this.filmImagesUrl.next(filmsArray);
    });
    }) 
    
  }



  getShipImage(id: number) {
    //recebimos el id y vamos sacar la imagen de otra api con ese ID
    this.http.get(`${environment.apiImg}/starships/${id}.jpg`, { responseType: 'blob' })
      .pipe(
        map(blob => URL.createObjectURL(blob)),
        catchError(error => {
          console.error('La imagen no existe en la Api');
          return of('../../../assets/images/image-not-found.png');
        })
      )
      .subscribe(imgUrl => {
        this.shipImageUrl.next(imgUrl);
      });
  }


}
