import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { StarshipComponent } from './pages/starship/starship/starship.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'starship', component: StarshipComponent },
    { path: 'starships', component: StarshipsComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/home' }
];
