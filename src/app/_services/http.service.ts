import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  addInfoAdv(token: string, km: string, numb_cars: string, car: string, type_car: string, data_start: string) {
    const myHeaders = new HttpHeaders().set('auth-token', token);
      return this.http.put<any>(`api/account/addInfoAdv`, { headers :myHeaders, km, numb_cars, car, type_car, data_start })
          .pipe(map(user => {
                  // store user details in local storage to keep user logged in
                  localStorage.setItem('Info', JSON.stringify(user));
                  this.currentUserSubject.next(user);

              return user;
          }));
  }

  logout() {
      localStorage.removeItem('Info');
      this.currentUserSubject.next(null);
  }

}
