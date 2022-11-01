import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Gender, Paging, Validator } from 'src/app/common/enumvalidator';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationDialogService } from 'src/assets/confirmation-dialog/confirmation-dialog.service';
/**
 * Quản lí nhân viên - hiển thị danh sách
 */
@Component({
  selector: 'app-root',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class Employee_listComponent implements OnInit {

  totalCount = Validator.ERROR;
  public loading = false;
  dataFind = '';

  public valueBirthdayFrom!: Date;
  public valueBirthdayTo!: Date;
  public format = "dd/MM/yyyy";
  public dateObj = new Date();
  public min = new Date(1970, 1, 1);
  public max = new Date(this.dateObj.getUTCFullYear() - 18, this.dateObj.getUTCMonth(),this.dateObj.getUTCDate())
  checkbirthday: any = false;
  checktime =false;
  checkdatafind =false;


  gender = Gender.NULL;
  select = [
    { id: Gender.MALE, name: "Nam" },
    { id: Gender.FEMALE, name: "Nữ" },
    { id: Gender.MALE_FEMALE, name: "Khác" }
  ];

  employees: Employee[] = []; 
  dataResult!:GridDataResult;

  constructor(private employeeService: EmployeeService,private confirmationDialogService: ConfirmationDialogService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.indexlist = Paging.SKIP;
    this.listall(Paging.SKIP,Paging.TAKE);
  }
  pageEvent!: PageEvent;
  manualPage = Paging.TAKE;
  indexlist! : number;
  viewgender! : '';
  
  public state: State = {
    skip: Paging.SKIP,
    take: Paging.TAKE,
  };

  nextpage (event :PageChangeEvent) {
    console.log(event)
    this.state.skip = event.skip;
    this.listall(this.state.skip,10);
  }

  endvalidatortime() : void{
    this.checkbirthday = false;
    this.checktime = false
    this.checkdatafind = false;
  }

  validatortime(){
    console.log(this.dataFind)
    this.checktime = false;
    var check = true;
    if((this.dataFind.search("</") != Paging.ERROR) || (this.dataFind.search("<") != Paging.ERROR))
    {
      check = false;
      this.checkdatafind = true;
    }
    if(this.valueBirthdayFrom > this.valueBirthdayTo)
    {
      check = false
      this.checktime = true;
    }
    if(new Date(this.valueBirthdayFrom) > this.max)
    {
      check = false;
      this.checkbirthday = true;
    }

    if(new Date(this.valueBirthdayTo) > this.max)
    {
      check = false;
      this.checkbirthday = true;
    }
    return check;
  }

  onKeydown(event :any) {
    if (event.key === "Enter") {
      if(this.validatortime())
      {
        this.listall(Paging.SKIP,Paging.TAKE);
      }
    }
  }

  find(){
    this.endvalidatortime();
    if(this.validatortime())
    {
      this.state.skip = Paging.SKIP;
      this.listall(Paging.SKIP,Paging.TAKE);
    }
  }
  
  listall(skip:any,take:any): void {
   
    const data = {
      valueBirthdayFrom: this.valueBirthdayFrom,
      valueBirthdayTo : this.valueBirthdayFrom,
      gender: this.gender,
      dataFind:this.dataFind.trim(),
      skip:skip,
      take:take
    };
    console.log(data);
    this.employeeService.getlist(data)
      .subscribe((res : any) => {
          this.totalCount=res.body.totalCount;
          this.dataResult = {data:res.body.employee,total:res.body.totalCount}
        },
        error => {
          console.log(error);
        });
  }

  /**
   * Dialog xác nhận xóa
   */
  public openConfirmationDialog(id:any,fullname :any) {
    this.confirmationDialogService.confirm(id,'Xác nhận', 'Xóa : '+fullname)
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log(''));
  }
}

