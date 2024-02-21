import { Component, OnInit } from '@angular/core';
import { ApiStarwarsService } from '../../../services/api-starwars.service';
import { StarshipResults } from '../../../interfaces/starship-data';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public starshipResults$!: Observable<StarshipResults>

  constructor(private apiservice: ApiStarwarsService) { };

  ngOnInit(): void {
    this.starshipResults$ = this.apiservice.getShipsList();
  }

  // del evento click envia el objecto ship e envia al service para
  // retirar el id de la url
  showShip(ship: any) {
    this.apiservice.getShip(ship)
  }
}
