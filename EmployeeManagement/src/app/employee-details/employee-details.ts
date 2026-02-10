import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.html',
  styleUrls: ['./employee-details.css']
})
export class EmployeeDetails implements OnInit {

  @Input() email!: string;
  @Output() back = new EventEmitter<void>();

  employee: any;
  attendance: any[] = [];
  leaves: any[] = [];
  projects: any[] = [];

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.employee = this.authService.getUsers().find(u => u.email === this.email);

    this.loadAttendance();
    this.loadLeaves();
    this.loadProjects();
  }

  loadAttendance() {
    const all = JSON.parse(localStorage.getItem('attendance') || '[]');
    this.attendance = all.filter((a: any) => a.email === this.email);
  }

  loadLeaves() {
    const all = JSON.parse(localStorage.getItem('leaves') || '[]');
    this.leaves = all.filter((l: any) => l.email === this.email);
  }

  loadProjects() {
    const all = JSON.parse(localStorage.getItem('projects') || '[]');
    this.projects = all.filter((p: any) => p.email === this.email);
  }

  goBack() {
    this.back.emit();
  }
}
