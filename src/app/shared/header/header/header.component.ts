import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginComponent } from '../../../pages/auth/login/login.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  private subscription: Subscription = new Subscription();


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLogged$.subscribe(
      (isLogged) => {
        this.isLogged = isLogged;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.authService.logout();
  }
}
