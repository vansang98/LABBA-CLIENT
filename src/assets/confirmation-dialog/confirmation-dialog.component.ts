import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { Employee_listComponent } from 'src/app/employee/employeeList/employee-list.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from './notification.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  //public modalRef!: MdbModalRef<ConfirmationDialogComponent>;
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() btnOkText: string | undefined;
  @Input() btnCancelText: string | undefined;
  @Input() id: any;

  constructor(private activeModal: NgbActiveModal, private employeeService: EmployeeService,private _router : Router,private notifiService:NotificationService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close(false);
  }
  public reloadCurrentRoute() {
    const currentUrl = "listEmployee";
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
  }
  public accept(id:any) {
    this.employeeService.delete(id)
      .subscribe(
        response => {
          if(response == true)
          {
            this.toastr.success("Xóa thành công","Xác nhận");
            this.reloadCurrentRoute();
          }
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }


}
