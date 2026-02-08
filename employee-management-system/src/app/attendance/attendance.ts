import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  userId = '';
  attendance: any[] = [];
  summary = { present: 0, wfh: 0, leave: 0};

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = user.id;

    this.loadAttendance();
  }

  getUserAttendance(id: string) {
    const data = JSON.parse(localStorage.getItem('attendance') || '[]');
    return data.filter((d: any)=> d.id === id);
  }

  loadAttendance(){
    this.attendance = this.getUserAttendance(this.userId);
    this.calculateSummary();
  }

  calculateSummary(){
    this.summary = { present: 0, wfh: 0, leave: 0};
    this.attendance.forEach((a:any) => {
      this.summary[a.status as keyof typeof this.summary]++;
    });
  }

  
}
