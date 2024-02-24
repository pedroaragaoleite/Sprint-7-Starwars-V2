import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './shared/navbar/navbar.component';

;
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sprint-7-Starwars-V2';

}
