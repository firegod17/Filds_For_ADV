import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services';
import {BehaviorSubject} from 'rxjs';
import {User} from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public currentUser;
  public AdditionalInfos;
  loading = false;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService
  ) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
   }

   ngOnInit() {
     if (this.currentUser.status === 'unverified') {
       this.router.navigate(['/home']);
     }
     this.httpService.AdvAdditional(this.currentUser.token)
       .subscribe(
         data => {
           localStorage.setItem('additionalInfo', JSON.stringify(data));
           this.AdditionalInfos = localStorage.getItem('additionalInfo') ? JSON.parse(localStorage.getItem('additionalInfo')) : '';
         },
         error => {
           this.toastr.error(error.message, 'Error');
           console.log(error);
           this.loading = false;
         });
    }

  statistick() {
    this.loading = true;
    this.router.navigate(['/statistick']);
  }
  home() {
    this.loading = true;
    this.router.navigate(['/home']);
  }
 onSubmit() {

  }
}


//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }
