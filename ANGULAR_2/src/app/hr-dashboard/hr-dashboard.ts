import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../services/employee'; 
import { Leave } from '../models/leave.model';
import { Wfh } from '../models/wfh.model';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.css','../dashboard.css']
})
export class HrDashboard implements OnInit {

  leaves: Leave[] = [];
  wfhRequests: Wfh[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadLeaves();
    this.loadWfh();
  }

  /* -------- LEAVES -------- */

  loadLeaves(): void {
    this.leaves = this.employeeService.getAllLeaves();
  }

  approveLeave(id: number): void {
    this.employeeService.updateLeaveStatus(id, 'Approved');
    this.loadLeaves();
  }

  rejectLeave(id: number): void {
    this.employeeService.updateLeaveStatus(id, 'Rejected');
    this.loadLeaves();
  }

  /* -------- WFH -------- */

  loadWfh(): void {
    this.wfhRequests = this.employeeService.getAllWfh();
  }

  approveWfh(id: number): void {
    this.employeeService.updateWfhStatus(id, 'Approved');
    this.loadWfh();
  }

  rejectWfh(id: number): void {
    this.employeeService.updateWfhStatus(id, 'Rejected');
    this.loadWfh();
  }
}
