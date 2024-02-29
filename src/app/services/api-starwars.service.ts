import { Injectable } from '@angular/core';
import { StarshipResults } from '../interfaces/starship-data';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, map, tap, catchError, BehaviorSubject, elementAt, forkJoin } from 'rxjs';

const apiStarWars = (`https://swapi.dev/api`);
const apiImages = (`https://starwars-visualguide.com/assets/img`);

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

  private movieNamesUrl = new BehaviorSubject<string[]>([]);
  currentMovieNameUrl = this.movieNamesUrl.asObservable();

  constructor(private http: HttpClient) { }


  //Function generica para hacer fetch
  private fetchData<T>(url: string): Observable<T> {
    // console.log(url);

    return this.http.get<T>(url)
  }

  getShipsList(currentPage: number): Observable<StarshipResults> {
    let result = this.http.get<StarshipResults>(`${environment.apiUrl}${currentPage}`)
    return result
  }

  // recibe el ship del component
  getShip(ship: any, id: number) {
    this.resetArrays();
    this.getShipImage(id);
    this.shipSource.next(ship);

    this.getUrlsIds(ship, "pilots")
    this.getUrlsIds(ship, "films")
    // this.getImagesId(ship, "pilots")
    // this.getImagesId(ship, "films")
    // console.log(ship.films);
  }

  getUrlsIds(ship: any, type: "pilots" | "films") {
    let urlsId: any = [];
    ship[type].forEach((element: any) => {
      let urlId = element.match(/\/(\d+)\/$/);
      urlsId.push(urlId[1]);
    });
    // console.log(urlsId);
    this.fetchNames(urlsId, type)
    this.fetchImages(urlsId, type)
  }



  private fetchNames(urls: string[], type: 'pilots' | 'films'): void {
    const endpoints = type === 'pilots' ? 'people' : type;
    const requests = urls.map(url => this.fetchData<any>(`${apiStarWars}/${endpoints}/${url}`)
      .pipe(
        map(response => type === 'pilots' ? response.name : response.title)));

    forkJoin(requests).subscribe(
      namesArray => {
        if (type === 'pilots') {
          this.pilotNamesUrl.next(namesArray)
        } else {
          this.movieNamesUrl.next(namesArray)
        }
      },
      error => console.error('Error fetching data', error)
    )
  }



  private fetchImages(urls: string[], type: "pilots" | "films") {
    const endpoints = type === 'pilots' ? 'characters' : type;
    const requests = urls.map(id =>
      this.http.get(`${environment.apiImg}/${endpoints}/${id}.jpg`, { responseType: 'blob' })
        .pipe(
          map(blob => URL.createObjectURL(blob)),
          catchError(error => {
            console.error('La imagen no existe en la Api');
            return of('../../../assets/images/image-not-found.png');
          })
        )
    );

    forkJoin(requests).subscribe(
      (imagesArray: any) => {
        if (type === 'pilots') {
          this.pilotImagesUrl.next(imagesArray);
        } else if (type === 'films') {
          this.filmImagesUrl.next(imagesArray);
        }
      },
      error => console.error("error fetching data: ", error)
    );
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


  resetArrays() {
    this.pilotImagesUrl.next([]);
    this.pilotNamesUrl.next([]);
    this.movieNamesUrl.next([]);
    this.filmImagesUrl.next([]);
  }
}
