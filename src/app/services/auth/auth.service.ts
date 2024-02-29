import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }


  register(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user, httpOptions)
      .pipe(
        map(user => {
          if (user && user.accessToken) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userToken', user.accessToken);
            this.currentUserSubject.next(user);
            this.userTokenSubject.next(user.accessToken);

          } else {
            console.error('Token no recibido del backend');
          }
          return user;
        })
      )
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${url}/login`, data, httpOptions)
      .pipe(
        map(res => {
          if (res && res.accessToken!) {
            localStorage.setItem('currentUser', res);
            localStorage.setItem('userToken', res.accessToken);
            this.currentUserSubject.next(res);
            this.userTokenSubject.next(res.accessToken);
            this.isLoggedSubject.next(true);
          }
          return res;
        })
      );
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${url}/users?email=${email}`)
      .pipe(
        map(users => users.length > 0)
      )
  }

  logout() {
    // Remueve el usuario y el token del almacenamiento local
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null!);
    this.userTokenSubject.next(null);
    this.isLoggedSubject.next(false);
  }
}
