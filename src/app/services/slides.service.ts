import { Injectable } from '@angular/core';
import { SlideData } from '../interfaces/slide-data';


@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  slideImgs: SlideData[] = [
    { img: "../../../assets/images/Arc170-Starfighter.jpeg" },
    { img: "../../../assets/images/Inquisitor.jpeg" },
    { img: "../../../assets/images/dalkor-dagger.jpeg" },

  ]

  constructor() { }
}
