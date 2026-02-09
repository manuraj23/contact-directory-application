import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-wfh-application',
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-wfh-application.html',
  styleUrl: './leave-wfh-application.css',
})
export class LeaveWfhApplication {
  myRequests: any[] = [];
  form = {
    type: '',
    fromDate: '',
    toDate: '',
    reason: ''
  }

  ngOnInit() {
    this.loadMyRequests();
  }

  loadMyRequests() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.myRequests = this.getUserRequests(user.id);
  }

  getUserRequests(userId: any) {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    return allRequests.filter((r: any) => r.uid === userId);
  }

  applyRequest() {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const newRequest = {
      reqid: 'r' + (allRequests.length + 1),
      uid: user.id,
      username: user.username,
      type: this.form.type,
      fromDate: this.form.fromDate,
      toDate: this.form.toDate,
      reason: this.form.reason,
      status: 'Pending',
    };

    allRequests.push(newRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(allRequests));

    this.reset();
    this.loadMyRequests();
  }

  reset() {
    this.form = {
      type: '',
      fromDate: '',
      toDate: '',
      reason: ''
    }
  }
}
