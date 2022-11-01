import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employee_listComponent } from './employee/employeeList/employee-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { Employee_InsertorupdateComponent } from './employee/employee-insertorupdate/employee-insertorupdate.component';

const routes: Routes = [
{path:'', component: HomeComponent, canActivate: [AuthGuard] },
{path:'login',component:LoginComponent},
{path:'listEmployee',component:Employee_listComponent},
{path:'insertorupdateEmployee/:id',component:Employee_InsertorupdateComponent},

];

export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);