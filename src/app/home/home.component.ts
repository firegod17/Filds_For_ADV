import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public currentUser;

  first_adv_form: FormGroup;
  constructor(private formBuilder: FormBuilder,



) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
   }

  ngOnInit() {

    this.first_adv_form = this.formBuilder.group({
      km: ['', Validators.required],
      numb_cars: ['', Validators.required],
      car: ['', Validators.required],
      type_car: ['', Validators.required],
      data_start: ['', Validators.required],

    });

             this.loading = false;
         };

  email = new FormControl('', [Validators.required, Validators.email]);

 getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
 }
 onSubmit() {

    // stop here if form is invalid
    if (this.first_adv_form.invalid) {
        return;
    }
    var dataObj={fields:this.first_adv_form.value}

    
}
}


//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }
