import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe } from '@angular/common';
import { Gender, Validator } from 'src/app/common/enumvalidator';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-employee-insertorupdate',
  templateUrl: './employee-insertorupdate.component.html',
  styleUrls: ['./employee-insertorupdate.component.css']
})
export class Employee_InsertorupdateComponent implements OnInit {

  removeEl(el:HTMLInputElement) {
    el.removeAttribute('inputmode');
    console.log(el)
  }
  endvalidate(): void{
    this.checkEmail = false;
    this.checkPhoneNumber = false;
    this.checkbirthday = false;
    this.checknullbirthday = false;
  }
  validate()
  {
    var vali = true;
    if((this.employees.fullname.search("</") != Validator.WARNING) || (this.employees.fullname.search("<script>") != Validator.WARNING))
    {
      vali = false;
      this.namecheck = true;
    }
    if((this.employees.password.search("</") != Validator.WARNING) || (this.employees.password.search("<script>") != Validator.WARNING))
    {
      vali = false;
      this.passwordcheck = true;
    }
    if(new Date(this.valueBirthday) > this.max)
    {
      vali = false;
      this.checkbirthday = true;
    }

    if(this.valueBirthday == '')
    {
      vali = false;
      this.checknullbirthday = true;
    }
    return vali;
  }

  public valueBirthday = '';
  public dateObj = new Date();
  public min = new Date(1970, 1, 1);
  public max = new Date(this.dateObj.getUTCFullYear() - 18, this.dateObj.getUTCMonth(),this.dateObj.getUTCDate())

  select = [
    { id: Gender.MALE, name: "Nam" },
    { id: Gender.FEMALE, name: "Nữ" },
    { id: Gender.MALE_FEMALE, name: "Khác" }
  ];

  checkEmail: any = false;
  checkPhoneNumber: any = false;
  checkbirthday: any = false;
  checknullbirthday: any = false;
  
  insertorupdate : boolean = true;

  employees: Employee = {
    id: Gender.NULL,
    fullname: '',
    username: '',
    password: '',
    email: '',
    birthday: new Date,
    gender: Gender.MALE,
    address: '',
    phonenumber: '',
    creattime: new Date
  };

  repasswordValue : any;
  form: FormGroup | any;  

  constructor(private route: ActivatedRoute,private employeeService: EmployeeService, private toastr: ToastrService,private formBuilder: FormBuilder,private _router : Router) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),]),
      gender: new FormControl('',[Validators.required]),
      birthday: new FormControl(['',[Validators.required]]),
      phonenumber: new FormControl(['', [Validators.required,Validators.minLength(10), Validators.maxLength(11),Validators.pattern("^[0-9]*$"),]]),
      email: new FormControl('', [Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required,Validators.pattern(
        this.employees.password,
      )]),
    });
  }

  submitted = false;
  phonenumbercheck:boolean = false;
  namecheck:boolean = false;
  passwordcheck:boolean = false;

  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id == '')// thêm mới
    {
      this.insertorupdate = true;
    }else{ // cập nhật
      this.insertorupdate = false;
      this.employeeService.find(this.id).subscribe((data: Employee)=>{
        if(data == null)
        {
          this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this._router.navigate(["listEmployee"]);
          });
        }
        else{
          this.employees = data;
          this.repasswordValue = data.password;
          this.valueBirthday = this.formatDate(new Date(data.birthday).toDateString()).toString();
        }
      });
    }
  }
 formatDate(date : any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  onChange(event: any):void{
    this.phonenumbercheck = false;
    var str = event.target.value.toString()
    if(str.substring(0, 2) == "84" && str.length == 9)
    {
      console.log(str.substring(0, 2));
      this.employees.phonenumber = "0" + str.substring(2, 10);
    }
    if((str.substring(0, 2) != "84" ||str.substring(0, 1) != "0") && str.length == 10)
    {
      console.log(str.substring(0, 1));
      this.phonenumbercheck = true;
    }
  }

  saveTutorial(insertorupdate : any): void {
    this.endvalidate();
    if(insertorupdate){
      this.id = "00000000-0000-0000-0000-000000000000"
    }
    const data = {
      id: this.id,
      fullname: this.employees.fullname.trim(),
      username : this.employees.username,
      password :this.employees.password.trim(),
      email: this.employees.email.trim(),
      birthday:  this.valueBirthday,
      gender: this.employees.gender,
      address: this.employees.address.trim(),
      phonenumber: this.employees.phonenumber.toString()
    };

    if(this.validate() == true)
    {
      if(insertorupdate)
      {
        this.employeeService.create(data)
        .subscribe(
          response => {
            console.log(data)
            if(response == 1)
            {
              this.toastr.success("Thêm mới thành công","Xác nhận");
              this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this._router.navigate(["listEmployee"]);
            });
            }
            else if(response == 2)
            {
              this.checkEmail =true;
            }
            else if(response == 3)
            {
              this.checkPhoneNumber = true;
            }
            else{
              this.toastr.error("Thêm mới thất bại","Xác nhận");
            }
            console.log(response);
            console.log(this.checkEmail);
            console.log(this.checkPhoneNumber);
          },
          error => {
            console.log(error);
          }
        );
      }else{
        this.employeeService.update(this.id, data).subscribe(res => {
          console.log('Respon '+res+' Post updated successfully!');
          if(res == 1)
          {
          this.toastr.success("Cập nhật thành công","Xác nhận");
          } else if(res == 2)
            {
              this.checkEmail =true;
            }
            else if(res == 3)
            {
              this.checkPhoneNumber = true;
            }
          else
          {
          this.toastr.error("Cập nhật thất bại","Xác nhận");
          }
        })
      }
    }
  }
}
