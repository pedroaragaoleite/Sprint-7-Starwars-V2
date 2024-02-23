import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlidesComponent } from '../../../components/slides/slides.component';
import { SlideData } from '../../../interfaces/slide-data';
import { SlidesService } from '../../../services/slides.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlidesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() slideImgs: SlideData[] = [];

  constructor(public slideServices: SlidesService) {
    this.slideImgs = slideServices.slideImgs;
  }
}
