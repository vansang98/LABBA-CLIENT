import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEnum } from 'src/app/common/enumvalidator';
import { EmployeeLogin, Token } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
/**
 * Quản lí nhân viên - Đăng nhập
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //
  registerForm:any =  FormGroup;

  checkUser: any;
  checkPass: any;

  loginForm: FormGroup | any;
  title = 'material-login';
  constructor(public employeeService: EmployeeService){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  employeeLogin: EmployeeLogin = {
  phonenumber: '',
  password: '',
  role:''
  };

  ngOnInit() {
  }

  form!: FormGroup;
  get f(){
    return this.form.controls;
  }

  onKeydown(event :any) {
    if (event.key === "Enter") {
      this.login();
    }
  }

  public login(){
    this.checkUser = false
    this.checkPass = false
    const dataLogin= {
      phonenumber: this.employeeLogin.phonenumber,
      password: this.employeeLogin.password,
      role: '',
    };
    this.employeeService.login(dataLogin).subscribe(
      (rs:Token) => {
          if(rs.error == LoginEnum.ERROR)
          {
            console.log("Tài khoản không đúng")
            this.checkUser = true
            localStorage.removeItem("token")
          }else if(rs.error == LoginEnum.ERROR_EMAIL)
          {
            this.checkPass = true
            console.log("Sai mật khẩu")
            localStorage.removeItem("token")
          }else{
            localStorage.setItem("token",rs.token)
            localStorage.setItem("username",rs.username)
            window.location.reload();
          }
      }, 
      (error: any) => {
          console.log(error)
      })
  }
}
