import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, UserModel } from '../auth';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboard implements OnInit {

  currentUser: any;
  leaves: any[] = [];
  projects: any[] = [];
  attendance: any[] = [];
  allUsers: UserModel[] = [];

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.allUsers = this.authService.getUsers();
    this.loadMyLeaves();
    this.loadMyProjects();
    this.loadAttendance();
    this.markTodayPresent();

    window.addEventListener('storage', () => {
      this.loadMyLeaves();
      this.loadMyProjects();
      this.loadAttendance();
    });
  }

  loadMyLeaves() {
    const all = JSON.parse(localStorage.getItem('leaves') || '[]');
    this.leaves = all.filter((l: any) => l.email === this.currentUser.email);
  }

  loadMyProjects() {
    const all = JSON.parse(localStorage.getItem('projects') || '[]');
    this.projects = all.filter((p: any) => p.team.includes(this.currentUser.email));
  }

  loadAttendance() {
    const all = JSON.parse(localStorage.getItem('attendance') || '[]');
    this.attendance = all.filter((a: any) => a.email === this.currentUser.email);
  }

  markTodayPresent() {
    const today = new Date().toISOString().split('T')[0];
    const all = JSON.parse(localStorage.getItem('attendance') || '[]');
    const exists = all.find((a: any) => a.email === this.currentUser.email && a.date === today);
    if (!exists) {
      all.push({ email: this.currentUser.email, date: today, status: 'Present' });
      localStorage.setItem('attendance', JSON.stringify(all));
      this.loadAttendance();
    }
  }

  applyLeave(form: any) {
    const leaves = JSON.parse(localStorage.getItem('leaves') || '[]');

    leaves.push({
      name: this.currentUser.firstName + " " + this.currentUser.lastName,
      email: this.currentUser.email,
      type: form.type,
      fromDate: form.fromDate,
      toDate: form.toDate,
      reason: form.reason,
      status: 'Pending'
    });

    localStorage.setItem('leaves', JSON.stringify(leaves));
    window.dispatchEvent(new Event('storage'));
    this.loadMyLeaves();
  }

  applyProject(form: any) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const teamArray = form.team ? form.team.split(',').map((e: string) => e.trim()) : [];

    teamArray.push(this.currentUser.email); 
    const uniqueTeam = Array.from(new Set(teamArray));

    uniqueTeam.forEach(email => {
      projects.push({
        name: this.allUsers.find(u => u.email === email)?.firstName + ' ' + this.allUsers.find(u => u.email === email)?.lastName || email,
        email: email,
        projectName: form.projectName,
        description: form.description,
        technology: form.technology,
        team: uniqueTeam,
        status: 'Pending'
      });
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    window.dispatchEvent(new Event('storage'));
    this.loadMyProjects();
  }
}
