import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services';
import {MatPaginator, MatSnackBar, ThemePalette} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpService } from '../_services';
import {DatePipe} from '@angular/common';
// import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
// import { IntlService } from '@progress/kendo-angular-intl';

export interface DifNames {
  // id: number;
  name: string;
  nameCompany: string;
}
export interface TableUsers {
  // position: number;
  car: string;
  status: string;
  name: string;
}
interface TitleSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [DatePipe]
})
export class AnalyticsComponent implements OnInit {
  public currentUser;
  public myRecCollection;
  public TableU;
  public myWallet;
  public AllInfo;
  public AdditionalInfos;
  // ------------------------DATA
  public selectedCampaign = false;
  public selectedCampaignNumber: number; //huy znaet nujno li, tak chto prover potom
  public InfoFirst;
  // public arrTitleCampaign = [];
  public numbAllCars;
  public idCampaign;
  // ---------------------Table
  displayedColumns: string[] = ['car', 'status', 'name'];
  public dataT: TableUsers[] = [];
  // ---------------------DATE
  public curDate = new Date();
  public DateOfStart: any;
  public DateOfEnd: any;
  public TimeStatus: string;
  // ---------------------easyFunc
  public formMoney: FormGroup;
  public loading: boolean;
  public loadingAll = true;
  public submitted;
  // ----------------------wallet
  public histWallets;
  public moneyForDriver;
  public moneyToPay;
  public statusVerify;
  public statusCampaign;
  public timeStatusWallet;
  public walletCampaign;
  // ----------------------progressLine
  public mode = 'query';
  public modeMoney = 'query';
  value = 100;
  valueMoney = 100;
  colorProgress: ThemePalette = 'primary';
  bufferValue = 0;
  // ----------------------------Charts
  public chartType: string = 'pie';
  public chartTypeCampaigns: string = 'bar';
  public chartTypeLine: string = 'line';
  public chartDatasets: Array<any> = [
    {data: [], label: 'Wallet'}
    // { data: [150], label: 'On Wallet'}
  ];
  public chartDatasetsCampaigns: Array<any> = [
    {data: [], label: 'Wallet'}
    // { data: [150], label: 'On Wallet'}
  ];
  public chartLabels: Array<any> = ['Money in campaign', 'Money on wallet'];
  public chartLabelsCampaigns: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartDatasetsLine: Array<any> = [
    {data: [], label: 'Input money in wallet'},
    {data: [], label: 'Money on wallet'}
  ];
  public chartLabelsLine: Array<any> = [];

  public chartColorsLine: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartColorsCampaigns: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];


  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    public datePipe: DatePipe,
    // private intl: IntlService,
  ) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.AdditionalInfos = localStorage.getItem('additionalInfo') ? JSON.parse(localStorage.getItem('additionalInfo')) : '';
    console.log(this.currentUser);
    this.chartCampaign(this.AdditionalInfos);


    // this.labelContent = this.labelContent.bind(this);
  }

  ngOnInit() {
    this.authenticationService.wallet(this.currentUser.token)
      .subscribe(
        data => {
          this.loadingAll = false;
          this.walletInfo(data);
          // this.chartDatasets = [{data: this.myWallet.wallet}];
        },
        error => {
          this.toastr.error(error.message, 'Error');
          console.log(error.message);
        });
    this.formMoney = this.formBuilder.group({
      InputMoney: ['', Validators.required]
    });
  }

  get fval() {
    return this.formMoney.controls;
  }

  walletInfo(data) {
    this.myWallet = data;
    this.AllInfo = data;
    this.histWallets = this.myWallet.historyOfPay;
    this.chartDatasets[0].data.push(data.wallet); //govnokod!!!!!!!!!!!!!!
    this.lineWallet();
  }

  changeCampaign(i) {
    this.selectedCampaignNumber = i;
    this.InfoFirst = this.AdditionalInfos[i];
    this.initializerBlocks(this.InfoFirst);
  }

  initializerBlocks(InfoFirst) {
    console.log(InfoFirst);
    this.DateOfStart = InfoFirst.data_start;
    this.DateOfEnd = this.DaysEnd(this.DateOfStart, InfoFirst.periodOfExcebition);
    this.CalcOfTime(this.DateOfEnd, this.DateOfStart);
    this.numbAllCars = InfoFirst.numb_cars;
    this.statusCampaign = InfoFirst.startCompany;
    this.moneyForDriver = this.InfoFirst.moneyForDriver;
    this.calcOfMoneyDriver(this.moneyForDriver);
    this.idCampaign = InfoFirst._id;
    console.log(this.idCampaign);
    this.StatisticCars(this.idCampaign);
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.formMoney.invalid) {
      return;
    }
    this.loading = true;
    this.httpService.walletAdd(this.fval.InputMoney.value, this.currentUser.token)
      .subscribe(
        data => {
          this.walletInfo(data);
          this.loading = false;
          this.openSnackBar();
        },
        error => {
          this.toastr.error(error.message, 'Error');
          console.log(error);
          this.loading = false;
        });

  }

  calcOfMoneyDriver(moneyDriver: number) {
    const moneyDrivers = moneyDriver;
    const moneyWallet = this.myWallet.wallet;
    if (moneyDrivers > moneyWallet) {
      this.moneyToPay = moneyDrivers - moneyWallet;
      this.moneyToPay = this.moneyToPay.toFixed(2);
      // tslint:disable-next-line:radix
      this.valueMoney = (moneyWallet * 100) / moneyDrivers;

      this.modeMoney = 'determinate';
    } else {
      this.moneyToPay = false;
    }
  }

  dateDiffInDays(a: Date, b: Date) { // Returns the days between a & b date objects...
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

// Calculate how many days between now and an event...
  daysTill(e: string | number | Date) {
    const eventE = new Date(e);
    const today = new Date();
    // today.setMonth(today.getMonth() + 2);
    return this.dateDiffInDays(today, eventE);
  }

  CalcOfTime(a: string | number | Date, b: string | number | Date): void {
    const timeOfStart = new Date(b);
    const TimeOfEnd = new Date(a);
    const timeLeft = this.daysTill(a);
    const allTime = Math.abs(this.dateDiffInDays(TimeOfEnd, timeOfStart));

    console.log(allTime);
    if (timeLeft > allTime) {
      const TimeLeftMore = timeLeft - allTime;  // if time of adv doesnt start TO BE CONTINUED...
      this.value = 0;
      this.mode = 'buffer';
      this.TimeStatus = TimeLeftMore + ' days left until the start of the campaign';
      this.timeStatusWallet = false;
    } else if (timeLeft === allTime) {
      this.TimeStatus = 'Congratulations today your adv have started:';
      this.timeStatusWallet = true;
    } else {
      // tslint:disable-next-line:radix
      if (timeLeft <= 5) {
        this.colorProgress = 'warn';
      }
      // tslint:disable-next-line:radix
      this.value = 100 - parseInt(String((timeLeft * 100) / allTime));
      if (allTime - timeLeft === 1) {
        this.TimeStatus = 'Duration: ' + (allTime - timeLeft) + ' day ' + ' | ' + timeLeft + ' left';
      } else {
        this.TimeStatus = 'Duration: ' + (allTime - timeLeft) + ' days ' + ' | ' + timeLeft + ' left';
      }
      this.mode = 'determinate';
      this.timeStatusWallet = true;
    }
  }

  StatisticCars(dataiD) {
    this.authenticationService.carsInCampaign(dataiD, this.currentUser.token)
      .subscribe(
        data => {
          this.loadingAll = false;
          console.log(data);
          this.myRecCollection = data;
          this.TableU = this.myRecCollection;
          this.dataT = this.myRecCollection;
          console.log('Maks info: ', this.TableU);
        },
        error => {
          this.toastr.error(error.message, 'Error');
          console.log(error.message);
        });
  }

  DaysEnd(a: string | number | Date, b: number): any {
    const datea = new Date(a);
    datea.setMonth(datea.getMonth() + b);
    return datea;
  }

  get LastChildHistory() {
    return this.histWallets[this.histWallets.length - 1];
  }

  openSnackBar() {
    this.snackBar.open(this.fval.InputMoney.value + ' ₴', 'Cancel', {
      duration: 4000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });

    // map() {
    // }
  }
  chartCampaign(data) {
    let moneyInAllCampaigns = 0;
    for (let i = 0; i < data.length; i++) {
      this.chartDatasetsCampaigns[0].data.push(parseInt(data[i].wallet));
      this.chartLabelsCampaigns.push(data[i].companyName + [i]);
    }
    for (let i = 0; i < data.length; i++) {
      moneyInAllCampaigns += data[i].wallet;
    }

    this.chartDatasets[0].data.push(moneyInAllCampaigns);
    console.log(this.chartDatasetsCampaigns);
    console.log(this.chartDatasets);
  }
  lineWallet() {
    let histWallet = this.histWallets;
    console.log(histWallet);
    for (let i = 0; i < histWallet.length; i++) {
      this.chartDatasetsLine[0].data.push(histWallet[i].money);
      const date = this.datePipe.transform(histWallet[i].data, 'MM-dd');
      this.chartLabelsLine.push(date);
    }
    for (let i = 0; i < histWallet.length; i++) {
      let allMoneyLine = 0;
      for (let n = 0; n < i; n++) {
        allMoneyLine += parseInt(histWallet[n].money);
      }
      this.chartDatasetsLine[1].data.push(allMoneyLine);
      console.log(allMoneyLine);
    }
    console.log(this.chartDatasetsLine);
  }
  AdvAdditional() {
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
  startCampaign() {
    this.httpService.startCampaign(this.idCampaign, this.currentUser.token)
      .subscribe(
        status => {
        },
        error => {
          console.log(error);
          this.AdvAdditional();
          // this.initializerBlocks(this.AdditionalInfos[this.selectedCampaignNumber]);
        });
  }
}
// export class SelectReactiveFormExample {
//   form: FormGroup;
//   foods: Food[] = [
//     {value: 'steak-0', viewValue: 'Steak'},
//     {value: 'pizza-1', viewValue: 'Pizza'},
//     {value: 'tacos-2', viewValue: 'Tacos'}
//   ];
//   cars: Car[] = [
//     {value: 'volvo', viewValue: 'Volvo'},
//     {value: 'saab', viewValue: 'Saab'},
//     {value: 'mercedes', viewValue: 'Mercedes'}
//   ];
//   foodControl = new FormControl(this.foods[2].value);
//   carControl = new FormControl(this.cars[1].value);
//
//   constructor() {
//     this.form = new FormGroup({
//       food: this.foodControl,
//       car: this.carControl
//     });
//   }
// }
//
