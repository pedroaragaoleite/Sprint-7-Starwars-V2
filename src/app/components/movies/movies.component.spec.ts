import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { ApiStarwarsService } from '../../services/api-starwars.service';
import { BehaviorSubject } from 'rxjs';
BehaviorSubject
ApiStarwarsService

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let apiStarwarsServiceMock: any;

  beforeEach(async () => {
    const filmsUrls = new BehaviorSubject<string[]>(['/api/films/1']);
    const moviesNames = new BehaviorSubject<string[]>(['A New Hope']);

    apiStarwarsServiceMock = {
      currentFilmUrl: filmsUrls.asObservable(),
      currentMovieNameUrl: moviesNames.asObservable()
    };


    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [{ provide: ApiStarwarsService, useValue: apiStarwarsServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update filmsArray and movieNames from the service on init', () => {
    expect(component.filmsArray).toEqual(['/api/films/1']);
    expect(component.movieNames).toEqual(['A New Hope']);
  });

  it('should update filmsArray and movieNames when service emits new values', () => {
    // Emit new values
    apiStarwarsServiceMock.currentFilmUrl.next(['/api/films/2']);
    apiStarwarsServiceMock.currentMovieNameUrl.next(['The Empire Strikes Back']);

    // Assert updated values
    expect(component.filmsArray).toEqual(['/api/films/2']);
    expect(component.movieNames).toEqual(['The Empire Strikes Back']);
  });
});
