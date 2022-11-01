/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Employee_listComponent } from './employee-list.component';

describe('Employee_listComponent', () => {
  let component: Employee_listComponent;
  let fixture: ComponentFixture<Employee_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Employee_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Employee_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
