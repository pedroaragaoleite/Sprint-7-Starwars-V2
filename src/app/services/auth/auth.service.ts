import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../../interfaces/user';

const url = environment.apiBack;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const isLoggedIn: boolean = false;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiBack;

  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: Observable<User | null>
  private userTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('userToken'));
  public userToken = this.userTokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${url}/users`, user, httpOptions);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${url}/users`, { email, password }, httpOptions)
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userToken', user.token);
            this.currentUserSubject.next(user);
            this.userTokenSubject.next(user.token);
          } else {
            console.error('Token no recibido del backend');
          }
          return user;
        })
      )
  }

  logout() {
    // Remueve el usuario y el token del almacenamiento local
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null!);
    this.userTokenSubject.next(null);
  }
}
