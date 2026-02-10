import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, UserModel } from '../auth';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.css']
})
export class HrDashboard implements OnInit {

  @Output() viewEmployee = new EventEmitter<string>();

  employees: UserModel[] = [];
  leaves: any[] = [];
  projects: any[] = [];
  attendance: any[] = [];

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadLeaves();
    this.loadProjects();
    this.loadAttendance();

    window.addEventListener('storage', () => {
      this.loadEmployees();
      this.loadLeaves();
      this.loadProjects();
      this.loadAttendance();
    });
  }

  loadEmployees() {
    this.employees = this.authService.getUsers();
  }

  loadLeaves() {
    this.leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  }

  loadProjects() {
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');
  }

  loadAttendance() {
    const all = JSON.parse(localStorage.getItem('attendance') || '[]');
    this.attendance = all.map((a: any) => {
      const emp = this.authService.getUsers().find(u => u.email === a.email);
      return { ...a, name: emp ? emp.firstName + ' ' + emp.lastName : a.email };
    });
  }

  updateLeaveStatus(index: number, status: string) {
    this.leaves[index].status = status;
    localStorage.setItem('leaves', JSON.stringify(this.leaves));
    window.dispatchEvent(new Event('storage'));
  }

  deleteLeave(index: number) {
    this.leaves.splice(index, 1);
    localStorage.setItem('leaves', JSON.stringify(this.leaves));
    window.dispatchEvent(new Event('storage'));
  }

  updateProjectStatus(index: number, status: string) {
    this.projects[index].status = status;
    localStorage.setItem('projects', JSON.stringify(this.projects));
    window.dispatchEvent(new Event('storage'));
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    window.dispatchEvent(new Event('storage'));
  }

  deleteEmployee(email: string) {
    this.authService.deleteUser(email);

    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    localStorage.setItem('leaves', JSON.stringify(allLeaves.filter((l: any) => l.email !== email)));

    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    localStorage.setItem('projects', JSON.stringify(allProjects.filter((p: any) => p.email !== email)));

    const allAttendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    localStorage.setItem('attendance', JSON.stringify(allAttendance.filter((a: any) => a.email !== email)));

    window.dispatchEvent(new Event('storage'));
  }

  viewEmployeeDetails(email: string) {
    this.viewEmployee.emit(email);
  }
}
