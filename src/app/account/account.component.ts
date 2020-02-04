import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public currentUser;
  loading = false;

  constructor(
    private router: Router,
  ) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
   }

   ngOnInit() {
     if (this.currentUser.status == "unverified") {
       this.router.navigate(['/home']);
     }
    }

  statistick() {
    this.loading = true;
    this.router.navigate(['/statistick']);
  }
 onSubmit() {

  }
}


//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }
