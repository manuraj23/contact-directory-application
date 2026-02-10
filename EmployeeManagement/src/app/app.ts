import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { HrDashboard } from './hr-dashboard/hr-dashboard';
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { EmployeeDetails } from './employee-details/employee-details';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Login, HrDashboard, EmployeeDashboard, EmployeeDetails],
  styleUrl: './app.css',
  template: `
    <app-login *ngIf="page === 'login'" (pageChange)="changePage($event)"></app-login>

    <app-hr-dashboard 
      *ngIf="page === 'hr'" 
      (viewEmployee)="showEmployeeDetails($event)">
    </app-hr-dashboard>

    <app-employee-details 
      *ngIf="page === 'employeeDetails'" 
      [email]="selectedEmployeeEmail" 
      (back)="goBackToHR()">
    </app-employee-details>

    <app-employee-dashboard *ngIf="page === 'employee'"></app-employee-dashboard>
  `
})
export class App {
  protected readonly title = signal('EmployeeManagement');

  page: string = 'login';
  selectedEmployeeEmail: string = '';

  changePage(newPage: string) {
    this.page = newPage;
  }

  showEmployeeDetails(email: string) {
    this.selectedEmployeeEmail = email;
    this.page = 'employeeDetails';
  }

  goBackToHR() {
    this.page = 'hr';
    this.selectedEmployeeEmail = '';
  }
}
