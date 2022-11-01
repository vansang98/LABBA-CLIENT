import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile, timer } from 'rxjs';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';
@Component({
  template: 'The href is: {{href}}',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnInit{

  constructor(private _router : Router) { }
  viewCheck: any;
  alive:boolean=true;
  public href: string = "";
  ///
  ngOnInit() {
    this.reloadCurrentRoute()
    timer(30000).pipe(takeWhile(()=>this.alive)).subscribe(_=>{
      const currentUrl = "listEmployee";
      this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this._router.navigate([currentUrl]);
      });
    })
  }
  ngOnDestroy()
  {
      this.alive=false;
  }
  public reloadCurrentRoute() {
    let routerString = "login";
    let stringToken = localStorage.getItem('token');
    if(stringToken == null)
    {
      routerString = "login";
      this.viewCheck = false;
    }else{
      routerString = "listEmployee";
      this.viewCheck = true;
    }
    this._router.navigateByUrl(this._router.url, {skipLocationChange: true}).then(() => {
        this._router.navigate([routerString]);
    });

  }
  logout() {
    this.viewCheck = false;
    // xóa dữ liệu trên localStorage
    localStorage.removeItem('token');
    const currentUrl = "login";
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
}
}

