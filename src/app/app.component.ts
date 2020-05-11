import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { HttpService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  public openSideBar = true;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private httpService: HttpService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.httpService.currentUser.subscribe(x => this.currentUser = x);
  }
  sidebarOpen() {
    if (this.openSideBar) {
      this.openSideBar = false;
    } else {
      this.openSideBar = true;
    }
  }
  logout() {
    this.authenticationService.logout();
    this.httpService.logout();
    this.router.navigate(['/login']);
}

}
