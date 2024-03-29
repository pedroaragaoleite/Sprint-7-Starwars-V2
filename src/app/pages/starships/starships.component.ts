import { Component, OnInit } from '@angular/core';
import { ApiStarwarsService } from '../../services/api-starwars.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { StarshipData, StarshipResults } from '../../interfaces/starship-data';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PilotsComponent } from '../../components/pilots/pilots.component';
import { MoviesComponent } from '../../components/movies/movies.component';
MoviesComponent

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [RouterLink, AsyncPipe, InfiniteScrollModule, NavbarComponent, MoviesComponent, PilotsComponent],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent {
  starshipResults: StarshipData[] = [];

  currentPage: number = 1;
  loadScroll: boolean = true;

  constructor(private apiservice: ApiStarwarsService) { };

  ngOnInit(): void {
    // 
    this.getAllShips();
  }

  getAllShips(): void {
    this.apiservice.getShipsList(this.currentPage)
      .subscribe((response) => {
        this.starshipResults = response.results;
        // console.log(this.starshipResults);
      })
  }

  // del evento click envia el objecto ship e envia al service para
  // retirar el id de la url
  showShip(ship: any) {
    const shipIdMatch = ship.url.match(/\/(\d+)\/$/);
    const id = shipIdMatch[1]
    this.apiservice.getShip(ship, id);
    // this.apiservice.getFilms(ship)
    // this.apiservice.getPilots(ship)
    // this.apiservice.getFilms(ship);
  }

  onScrollDown() {
    if (this.loadScroll && this.starshipResults.length < 36) {
      this.currentPage++;
      this.apiservice.getShipsList(this.currentPage)
        .subscribe((response) => {
          response.results.forEach((result => {
            this.starshipResults.push(result)
            // console.log(this.starshipResults);

          }))
        })
    }
  }
}
