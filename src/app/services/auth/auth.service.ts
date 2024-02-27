import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../../interfaces/user';
import * as bcrypt from 'bcryptjs';


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
    user.password = bcrypt.hashSync(user.password as string, 12);
    user.accessToken = "Fake token"

    return this.http.post<User>(`${url}/users`, user, httpOptions)
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
          console.log(this.userToken);

          return user;
        })
      )
  }

  login(data: string): Observable<User> {
    return this.http.post<User>(`${url}/users`, data, httpOptions)
      .pipe(
        map(res => {
          res.accessToken = "Fake token"
          console.log(res);
          if (res && res.accessToken!) {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
            localStorage.setItem('userToken', res.accessToken);
            this.userTokenSubject.next(res.accessToken);


          }

          return res;
        })
      );
  }

  checkEmail(email: string): Observable<boolean> {
    console.log(email);

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
  }
}
