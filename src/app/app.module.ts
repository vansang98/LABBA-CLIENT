import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee_listComponent } from './employee/employeeList/employee-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/assets/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from 'src/assets/confirmation-dialog/confirmation-dialog.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { appRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Employee_InsertorupdateComponent } from './employee/employee-insertorupdate/employee-insertorupdate.component';

@NgModule({
  declarations: [	
    AppComponent,
    Employee_listComponent,
    HomeComponent,
    LoginComponent,
    Employee_InsertorupdateComponent
   ],
  imports: [ 
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    InputsModule,
    MatButtonModule,
    MatInputModule,
    ToastrModule.forRoot(),
    appRoutingModule,
    IntlModule,
    LabelModule,
    ButtonsModule,
    DateInputsModule,
    NgbModule,
    GridModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClientModule,ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent, ],
  exports:[RouterModule]
})
export class AppModule { }
