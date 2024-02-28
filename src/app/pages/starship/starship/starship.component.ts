import { Component } from '@angular/core';
import { ApiStarwarsService } from '../../../services/api-starwars.service';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { PilotsComponent } from '../../../components/pilots/pilots.component';
import { MoviesComponent } from '../../../components/movies/movies.component';


@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [NavbarComponent, PilotsComponent, MoviesComponent],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent {
  ship: any;
  imgUrl: string | null = null;
  filmsArray: string[] = [];
  


  constructor(private apiservice: ApiStarwarsService) { }

  ngOnInit(): void {
    this.apiservice.currentShip.subscribe(ship => {
      this.ship = ship;

    })
    this.apiservice.currentShipUrl.subscribe(url => {
      this.imgUrl = url;
    })
  
  }
  
}
