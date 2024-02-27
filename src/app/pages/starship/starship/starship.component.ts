import { Component } from '@angular/core';
import { ApiStarwarsService } from '../../../services/api-starwars.service';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent {
  ship: any;
  imgUrl: string | null = null;
  filmsArray: string[] = [];


  constructor(private apiservice: ApiStarwarsService) { 

    // console.log(this.filmsArray);
    
  }

  ngOnInit(): void {
    this.apiservice.currentShip.subscribe(ship => {
      this.ship = ship;

    })
    this.apiservice.currentShipUrl.subscribe(url => {
      this.imgUrl = url;
    })
    this.apiservice.currentFilmUrl.subscribe(url => {
      this.filmsArray = url;
    })
  }

  
}
