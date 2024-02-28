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

  private pilotNamesUrl = new BehaviorSubject<string[]>([]);
  currentPilotNameUrl = this.pilotNamesUrl.asObservable();

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

  getFilms(ship: any) {
    let shipArray: any = [];
    ship.films.forEach((film: any) => {
      let filmId = film.match(/\/(\d+)\/$/);
      shipArray.push(filmId[1]);
    })
    this.getFilmsImage(shipArray);
  }

  getPilots(ship: any) {
    let pilotsId: any = [];
    ship.pilots.forEach((pilot: any) => {
      let pilotId = pilot.match(/\/(\d+)\/$/);
      pilotsId.push(pilotId[1]);
    });
    console.log(pilotsId);
    this.getPilotsNames(pilotsId);
    this.getPilotsImage(pilotsId);

    this.resetArrays();
  }

  getPilotsNames(pilotsId: any) {
    pilotsId.forEach((element: number) => {
      console.log(element);
      
      this.http.get(`https://swapi.dev/api/people/${element}`)
      .subscribe((pilotName: any) => {
        let pilotNames = pilotName.name;
        let pilotNameArray = [...this.pilotNamesUrl.value, pilotNames];
        console.log(pilotNameArray);     
        this.pilotNamesUrl.next(pilotNameArray)
           
      })
    })
  }

  resetArrays() {
    this.pilotImagesUrl.next([]);
    this.pilotNamesUrl.next([]);
  }

  getPilotsImage(pilotsId: any) {
    pilotsId.forEach((element: number) => {
      this.http.get(`${environment.apiImg}/characters/${element}.jpg`, { responseType: 'blob' })
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

  getFilmsImage(shipArray: any) {
    shipArray.forEach((element: number) => {
      this.http.get(`${environment.apiImg}/films/${element}.jpg`, { responseType: 'blob' })
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
