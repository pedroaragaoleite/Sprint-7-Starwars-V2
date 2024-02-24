import { Component, Input } from '@angular/core';
import { SlideData } from '../../interfaces/slide-data';
import { setActiveConsumer } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.scss'
})
export class SlidesComponent {
  @Input() slideImgs!: SlideData[];
  slide: number = 0;

  ngOnInit(): void {
    console.log(this.slideImgs);

  }

  prevSlide(): void {
    if (this.slide === 0) {
      setTimeout(() => {
        this.slide = this.slideImgs.length - 1;
        console.log(this.slide);

      }, 300)

    } else {
      setTimeout(() => {
        this.slide--;
        console.log(this.slide);
      }, 300)

    }
  }

  nextSlide(): void {
    if (this.slide === this.slideImgs.length - 1) {
      setTimeout(() => {
        this.slide = 0;
      }, 300)

    } else {
      setTimeout(() => {
        this.slide++;
      }, 300)
    }

  }
}
