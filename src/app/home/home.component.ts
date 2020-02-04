import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { HttpService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  first_adv_form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public currentUser;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpService : HttpService,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService
  ) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.authenticationService.checkStatus(this.currentUser.token)
   }

   ngOnInit() {
     this.first_adv_form = this.formBuilder.group({
      km: ['', Validators.required],
      numb_cars: ['', Validators.required],
      car: ['', Validators.required],
      type_car: ['', Validators.required],
      data_start: ['', Validators.required],
    });
  }

    get fval() { return this.first_adv_form.controls; }

 onFormSubmit() {
   this.submitted = true;
   if (this.first_adv_form.invalid) {
     return;
   }
   this.loading = true;
   this.httpService.addInfoAdv(this.currentUser.token, this.fval.km.value, this.fval.numb_cars.value, this.fval.car.value, this.fval.type_car.value, this.fval.data_start.value)
      .subscribe(
          data => {
            this.router.navigate(['/account']);
          },
          error => {
            this.toastr.error(error.message, 'Error');
            console.log(error.message);

            this.loading = false;
          });

  }
}


//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }
