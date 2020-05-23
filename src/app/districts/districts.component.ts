import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../_services';

// function addDistrict(a) {
//   alert(a);
// }

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {
  public formDistrict: FormGroup;
  public submitted = false;
  loading = false;
  public tableInfoDistrict = [];
  private toastr: any;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.formDistrict = this.formBuilder.group({
      district: ['', Validators.required],
      Longitude: ['', Validators.required],
      Latitude: ['', Validators.required],
    });

    }

  get fval() {
    return this.formDistrict.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.formDistrict.invalid) {
      return;
    }
    const districtValue: any = {
        district: this.fval.district.value,
        Latitude: this.fval.Latitude.value,
        Longitude: this.fval.Longitude.value
      };
    this.tableInfoDistrict.push(districtValue);
    console.log(this.tableInfoDistrict);
    this.formDistrict.reset();
    this.httpService.district()
      .subscribe(
        data => {
          const dataDistrict = data;
          console.log(dataDistrict);
        },
        error => {
          this.toastr.error(error.message, 'Error');
          console.log(error);
          this.loading = false;
        });
  }

}
