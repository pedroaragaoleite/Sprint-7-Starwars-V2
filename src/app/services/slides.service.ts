import { Injectable } from '@angular/core';
import { SlideData } from '../interfaces/slide-data';


@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  slideImgs: SlideData[] = [
    { img: "../../../assets/images/shuttle.jpeg" },
    { img: "../../../assets/images/maraudor.jpeg" },
    { img: "../../../assets/images/t-85.jpeg" },

  ]

  constructor() { }
}
