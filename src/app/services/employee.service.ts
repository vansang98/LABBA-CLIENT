import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
/**
 * EmployeeService - xử lí API
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private tokenInfo = localStorage.getItem("token")
  private apiServer = 'http://localhost:5000';
  headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenInfo}`,
    })
  constructor(private httpClient: HttpClient,private _router : Router) { } 
  //Đăng nhập
  login(data: any): Observable<any> {
    return this.httpClient.post(this.apiServer+'/login/', data).pipe(
      catchError(this.errorHandler)
    );
  }
  // lấy thông tin nhân viên theo Id
  getById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiServer + '/getlist/byid/' + id, {headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // lấy danh sách theo điều kiện lọc
  getlist(datafind:any): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      observe: 'response' as 'response',
    };
    return this.httpClient.post(this.apiServer + '/getlist/',datafind,httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  ///thêm mới nhân viên
  create(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.apiServer + '/addpost', data, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
  //tìm kiếm theo 
  find(id:any): Observable<any> {
    return this.httpClient.get(this.apiServer + '/getbyid/' + id, {headers: this.headers})
    .pipe(
      catchError(this.errorHandler)
    )
  }
  //Sửa thông tin nhân viên
  update(id: any, data: any): Observable<any> {
    return this.httpClient.post(this.apiServer+'/update/'+id, data, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
  //Xóa thông tin nhân viên
  delete(id: any): Observable<any> {
    return this.httpClient.post(this.apiServer +'/delete/'+ id,id, {headers: this.headers}).pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       ///localStorage.removeItem('token');
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
  /**
   * Quay lại trang login khi hết token
   */
  public backlogin() {
    let routerString = "login";
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([routerString]);
    });

  }
}