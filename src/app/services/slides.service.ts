import { Injectable } from '@angular/core';
import { SlideData } from '../interfaces/slide-data';


@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  slideImgs: SlideData[] = [
    { img: "../../../assets/images/4.jpeg" },
    { img: "../../../assets/images/2.jpeg" },
    { img: "../../../assets/images/3.jpeg" },

  ]

  constructor() { }
}
