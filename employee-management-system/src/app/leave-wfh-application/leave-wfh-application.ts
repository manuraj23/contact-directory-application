import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-leave-wfh-application',
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-wfh-application.html',
  styleUrl: './leave-wfh-application.css',
})
export class LeaveWfhApplication {
  myRequests: any[] = [];

  ngOnInit() {
    this.loadMyRequests();
  }

  loadMyRequests() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.myRequests = this.getUserRequests(user.id);
  }

  getUserRequests(userId: any) {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    return allRequests.filter((r: any) => r.uid === userId && r.status!=='Cancelled');
  }

  applyRequest(form: NgForm, formValue: any) {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const newRequest = {
      reqid: 'r' + (allRequests.length + 1),
      uid: user.id,
      username: user.username,
      type: formValue.type,
      fromDate: formValue.fromDate,
      toDate: formValue.toDate,
      reason: formValue.reason,
      status: 'Pending',
    };

    allRequests.push(newRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(allRequests));

    this.reset(form);
    this.loadMyRequests();
  }

  reset(form: NgForm) {
    form.resetForm();
  }

  cancelRequest(id: string) {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    for (let r of allRequests) {
      if (r.reqid === id) {
        r.status = 'Cancelled';
      }
    }
    localStorage.setItem('leaveRequests', JSON.stringify(allRequests));
    this.loadMyRequests();
  }
}
