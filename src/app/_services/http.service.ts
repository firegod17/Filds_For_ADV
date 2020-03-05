import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

  addInfoAdv(
    token: string,
    km: number,
    numb_cars: number,
    car: string,
    type_car: string,
    data_start: string,
    periodOfExcebition: number) {
      return this.http.put<any>(`api/account/addInfoAdv`, {
        km,
        numb_cars,
        car,
        type_car,
        data_start,
        periodOfExcebition
      })
          .pipe(map(user => {
              // store user details in local storage to keep user logged in
              localStorage.setItem('currentUser', JSON.stringify(user));
              return user;
          }));
  }

  ngOnInit() {

   }
  logout() {
      localStorage.removeItem('Info');
      this.currentUserSubject.next(null);
  }

}
