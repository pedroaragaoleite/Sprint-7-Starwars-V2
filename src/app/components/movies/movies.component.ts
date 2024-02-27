import { Component, Input, OnInit } from '@angular/core';
import { StarshipComponent } from '../../pages/starship/starship/starship.component';
import { ApiStarwarsService } from '../../services/api-starwars.service';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [StarshipComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  filmsArray:string[] = [];

  constructor(private apiservice: ApiStarwarsService ) {}

  ngOnInit(): void {
        this.apiservice.currentFilmUrl.subscribe(url => {
    this.filmsArray = url;
  })

  }

}
