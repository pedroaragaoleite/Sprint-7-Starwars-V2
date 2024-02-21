import { Component } from '@angular/core';
import { ApiStarwarsService } from '../../../services/api-starwars.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent {
  ship: any;
  imgUrl: string | null = null;


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
