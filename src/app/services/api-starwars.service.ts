import { Injectable } from '@angular/core';
import { StarshipResults } from '../interfaces/starship-data';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, map, tap, catchError, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiStarwarsService {
  private shipSource = new BehaviorSubject<any>(null);
  currentShip = this.shipSource.asObservable();

  private shipImageUrl = new BehaviorSubject<string | null>(null);
  currentShipUrl = this.shipImageUrl.asObservable();

  constructor(private http: HttpClient) { }

  getShipsList(): Observable<StarshipResults> {
    let result = this.http.get<StarshipResults>(`${environment.apiUrl}`)
    result.pipe(
      tap(data => console.log(data.results)
      )
    ).subscribe();
    console.log(result);

    return result
  }

  // recibe el ship del component
  getShip(ship: any) {
    // isoloamos los numeros despues de la /
    const shipIdMatch = ship.url.match(/\/(\d+)\/$/);
    // console.log(shipIdMatch[1]);
    // enviamos el id a la funcion getShipImage
    this.getShipImage(shipIdMatch[1]);
    this.shipSource.next(ship);
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
