import { Component, OnInit } from '@angular/core';
import { StarshipComponent } from '../../pages/starship/starship/starship.component';
import { ApiStarwarsService } from '../../services/api-starwars.service';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [StarshipComponent],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent implements OnInit {
  pilotsArray: string[] = [];
  pilotsNames: string[] = [];
  ship: any;

  constructor(private apiservice: ApiStarwarsService) { }

  ngOnInit(): void {
    this.apiservice.currentPilotUrl.subscribe(url => {
      this.pilotsArray = url;
    })
    this.apiservice.currentShip.subscribe(ship => {
      this.ship = ship;
    })
    this.apiservice.currentPilotNameUrl.subscribe(url => {
      this.pilotsNames = url;
    })
  }


}
