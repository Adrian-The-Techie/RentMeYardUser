import { ViewSpecificServiceComponent } from './components/view-specific-service/view-specific-service.component';
import { MainGuard } from './guards/main.guard';
import { ServiceFormComponent } from './gen-components/service-form/service-form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicesComponent } from './components/services/services.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[MainGuard],
    children:[
      {
        path:'services',
        component:ServicesComponent
      },
      {
        path:'addService',
        component:ServiceFormComponent
      },
      {
        path:'services/:url',
        component:ViewSpecificServiceComponent
      },
      {
        path:'editService/:url',
        component:ServiceFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
