import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee';
import { Leave } from '../models/leave.model';
import { Wfh } from '../models/wfh.model';
import { Project } from '../models/project.model';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css','../dashboard.css']
})
export class UserDashboard implements OnInit {

  username = '';

  attendanceRecords: any[] = [];
  leaves: Leave[] = [];
  wfhRequests: Wfh[] = [];

  // Leave form model
  newLeave: Leave = {
  id: 0,
  username: '',
  fromDate: '',
  toDate: '',
  reason: '',
  status: 'Pending'
};

  // WFH form model
  newWfh: Wfh = {
  id: 0,
  username: '',
  date: '',
  reason: '',
  status: 'Pending'
};

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    this.username = currentUser.username;
    this.loadPersonalDetails();
    this.loadProjects();
    this.attendanceRecords =
      this.employeeService.getUserAttendance(this.username);

    this.loadLeaves();
    this.loadWfh();
  }

  /* -------- LEAVES -------- */

  loadLeaves(): void {
    this.leaves = this.employeeService.getUserLeaves(this.username);
  }

  applyLeave(): void {
    // Convert input dates to Date objects
  const from = this.convertToDate(this.newLeave.fromDate);
  const to = this.convertToDate(this.newLeave.toDate);

  if (to < from) {
    alert('End date must be after start date');
    return;
  }

  // Store in dd-mm-yyyy format
  this.newLeave.fromDate = this.formatDateDDMMYYYY(from);
  this.newLeave.toDate = this.formatDateDDMMYYYY(to);

  this.newLeave.id = Date.now();
  this.newLeave.username = this.username;
  this.employeeService.applyLeave(this.newLeave);

  this.newLeave = {
    id: 0,
    username: '',
    fromDate: '',
    toDate: '',
    reason: '',
    status: 'Pending'
  };

  this.loadLeaves();
  }

  cancelLeave(id: number): void {
    this.employeeService.cancelLeave(id);
    this.loadLeaves();
  }
  // Convert 'yyyy-mm-dd' (from <input type="date">) to Date object
convertToDate(input: string): Date {
  const parts = input.split('-'); // input is yyyy-mm-dd
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

// Convert Date object to 'dd-mm-yyyy' string
formatDateDDMMYYYY(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}


  /* -------- WFH -------- */

  loadWfh(): void {
    this.wfhRequests = this.employeeService.getUserWfh(this.username);
  }

  applyWfh(): void {
   if (!this.newWfh.date) {
    alert('Please select a date');
    return;
  }

  // Convert date to dd-mm-yyyy
  const d = this.convertToDate(this.newWfh.date);
  this.newWfh.date = this.formatDateDDMMYYYY(d);

  this.newWfh.id = Date.now();
  this.newWfh.username = this.username;
  this.employeeService.applyWfh(this.newWfh);

  this.newWfh = {
    id: 0,
    username: '',
    date: '',
    reason: '',
    status: 'Pending'
  };

  this.loadWfh();
  }

  cancelWfh(id: number): void {
    this.employeeService.cancelWfh(id);
    this.loadWfh();
  }
  // ----------------- PERSONAL DETAILS -----------------
personalDetails: any = {
  username: '',
  fullName: '',
  email: '',
  phone: '',
  department: ''
};

// Load personal details for this user
loadPersonalDetails(): void {
  const details = this.employeeService.getPersonalDetails(this.username);
  if (details) {
    this.personalDetails = { ...details };
  } else {
    this.personalDetails.username = this.username; // at least have username
  }
}

// Save updated personal details
savePersonalDetails(): void {
  this.employeeService.savePersonalDetails(this.personalDetails);
  alert('Personal details saved successfully');
}
// ----------------- PROJECTS -----------------
projects: Project[] = [];

newProject: Project = {
  id: 0,
  username: '',
  name: '',
  description: '',
  status: 'Not Started'
};

// Load user's projects
loadProjects(): void {
  this.projects = this.employeeService.getUserProjects(this.username);
}

// Add new project
addProject(): void {
  if (!this.newProject.name) return;

  this.newProject.id = Date.now(); // simple unique ID
  this.newProject.username = this.username;
  this.employeeService.addOrUpdateProject(this.newProject);

  this.newProject = {
    id: 0,
    username: '',
    name: '',
    description: '',
    status: 'Not Started'
  };

  this.loadProjects();
}

// Update status
updateProjectStatus(project: Project, status: 'Not Started' | 'In Progress' | 'Done'): void {
  project.status = status;
  this.employeeService.addOrUpdateProject(project);
  this.loadProjects();
}

// Delete project
deleteProject(id: number): void {
  this.employeeService.deleteProject(id);
  this.loadProjects();
}

}
