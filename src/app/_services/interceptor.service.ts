import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
@Injectable()
export class InterceptorService implements HttpInterceptor {
  public currentUser;

  constructor(
  ) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
   }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqUrl = environment.apiBaseUrl;
      req = req.clone({
        headers: req.headers.set(
          "auth-token",
          "" + this.currentUser.token
        ),
        url: reqUrl +""+ req.url
      });
    return next.handle(req);
  }
}
