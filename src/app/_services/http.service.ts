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
  walletAdd(inputMoney: number, token: string) {
    const myHeaders = new HttpHeaders().set('auth-token', token);
    const inputmoney = inputMoney;
    console.log(inputmoney);
    return this.http.post<any>(`api/money/advPay`, {money: inputmoney}, {headers: myHeaders})
      .pipe(map(user => {
        console.log(user);
        return user;
      }));
  }
  district(): Observable<any> {
    // const myHeaders = new HttpHeaders().set('auth-token', token);
    return this.http.get('assets/kyiv.34272c8c.json')
      .pipe(map((response: Response) => {
        console.log('mock data' + response.json());
        return response.json();
      }));
  }

  ngOnInit() {

   }
  logout() {
      localStorage.removeItem('Info');
      this.currentUserSubject.next(null);
  }

}
