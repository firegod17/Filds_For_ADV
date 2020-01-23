import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
function httpRequest(method,path,dataObj,callback){
    var endpoint = "http://af356cc4.ngrok.io/"

    var httpPost = new XMLHttpRequest();

    httpPost.onload = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
            var response=JSON.parse(httpPost.responseText)//here you will get uploaded image id
            callback(response);
        } else {
            console.log(err);
        }
    }
    httpPost.open(method, endpoint+path, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');//Specifies type of request
    httpPost.send(JSON.stringify(dataObj))
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  }
  email = new FormControl('', [Validators.required, Validators.email]);

 getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
 }
 onSubmit() {

    // stop here if form is invalid
    if (this.verificationForm.invalid) {
        return;
    }



  var dataObj={fields:this.first_adv_form.value}

  httpRequest('POST','fields/verify',dataObj,(response)=>{
    console.log(response)
  })
  this.alertService.success("You Verify press 'Next Step'")


}
//  logout() {
//    this.authenticationService.logout();
//    this.router.navigate(['/login']);
// }

}
