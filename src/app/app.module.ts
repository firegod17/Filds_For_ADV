import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// services
import { InterceptorService } from './_services/interceptor.service';
import { UserService } from './_services/user.service';
import { HttpService } from './_services/http.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { StatistickComponent } from './statistick/statistick.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatCardModule, MatSlideToggleModule
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { AnalyticsComponent } from './analytics/analytics.component';
import {MatToolbarModule} from '@angular/material/toolbar';
// import { ChartsModule } from '@progress/kendo-angular-charts';
import {MatTableModule} from '@angular/material/table';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
// import * as moment from 'moment';
import { DistrictsComponent } from './districts/districts.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import 'hammerjs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { DocumentsComponent } from './documents/documents.component';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountComponent,
    StatistickComponent,
    AnalyticsComponent,
    DistrictsComponent,
    DocumentsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTableModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        ChartsModule,
        ScrollingModule,
        WavesModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatToolbarModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(),
        MatSidenavModule,
        MatDividerModule,
        MatListModule,
        MatFileUploadModule,
        MatCardModule,
        MatSlideToggleModule,
        FormsModule,
        MatSnackBarModule,
    ],
  providers: [UserService, HttpService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }], //
  bootstrap: [AppComponent]
})
export class AppModule { }
