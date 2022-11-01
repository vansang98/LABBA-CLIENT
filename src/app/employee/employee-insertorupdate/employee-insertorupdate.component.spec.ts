/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Employee_InsertorupdateComponent } from './employee-insertorupdate.component';

describe('EmployeeInsertorupdateComponent', () => {
  let component: Employee_InsertorupdateComponent;
  let fixture: ComponentFixture<Employee_InsertorupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Employee_InsertorupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Employee_InsertorupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
