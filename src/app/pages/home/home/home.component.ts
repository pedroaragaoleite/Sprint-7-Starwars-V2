import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlidesComponent } from '../../../components/slides/slides.component';
import { SlideData } from '../../../interfaces/slide-data';
import { SlidesService } from '../../../services/slides.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SlidesComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() slideImgs: SlideData[] = [];

  constructor(public slideServices: SlidesService) {
    this.slideImgs = slideServices.slideImgs;
  }
}
