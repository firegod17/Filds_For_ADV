import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
/**Componenets */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { StatistickComponent } from './statistick/statistick.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {DistrictsComponent} from './districts/districts.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistick',
    component: StatistickComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'districts',
    component: DistrictsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
