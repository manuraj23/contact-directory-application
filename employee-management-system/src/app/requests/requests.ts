import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests {
  allRequests: any[] = [];

  ngOnInit() {
    this.authorizeHR();
    this.loadAllRequests();
  }

  authorizeHR() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user.role !== 'hr') {
      alert('Access denied');
    }
  }

  loadAllRequests() {
    this.allRequests = JSON.parse(
      localStorage.getItem('leaveRequests') || '[]'
    );
    this.allRequests = this.allRequests.filter((r:any) => r.status!=='Cancelled');
  }

  updateStatus(id: string, status: 'Approved' | 'Rejected') {
    let requests = JSON.parse(
      localStorage.getItem('leaveRequests') || '[]'
    );

    for (let r of requests) {
      if (r.id === id) {
        r.status = status;
      }
    }
    localStorage.setItem('leaveRequests', JSON.stringify(requests));
    this.loadAllRequests();
  }
}