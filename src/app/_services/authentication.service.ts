import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`api/user/loginAdvertiser`, { email, password })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
  carsInCampaign(idCampaign, token: string ) {
    const myHeaders = new HttpHeaders().set('auth-token', token);
    return this.http.post<any>(`api/carsInCampaign`, {_id: idCampaign}, {headers: myHeaders})
            .pipe(map(user => {
                return user;
            }));
    }
     wallet(token: string) {
      const myHeaders = new HttpHeaders().set('auth-token', token);

      return this.http.get<any>(`api/checkStatus/AdvFullInfo`, {headers: myHeaders})
        .pipe(map(user => {
          console.log(user);
          return user;
        }));
    }



    checkStatus(token: string) {

      const myHeaders = new HttpHeaders().set('auth-token', token);
      return this.http.get<any>(`api/checkStatus/Adv`, {headers: myHeaders})
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('additionalInfo');
        this.currentUserSubject.next(null);
    }
}
