import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';

import { HttpService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './statistick.component.html',
  styleUrls: ['./statistick.component.css'],
})
export class StatistickComponent implements OnInit {
  public currentUser;
  public myRecCollection;

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,

  ) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
   }

   ngOnInit() {
     // this.authenticationService.carsInCampaign()
     //    .subscribe(
     //        data => {
     //          console.log(data);
     //          this.myRecCollection = data;
     //        },
     //        error => {
     //          this.toastr.error(error.message, 'Error');
     //          console.log(error.message);
     //        });
    }


   onSubmit() {

    }
}


//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }
