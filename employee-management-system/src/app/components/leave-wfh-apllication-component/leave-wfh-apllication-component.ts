import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave-service';
import { EmpApplications } from '../../interfaces/emp-applications';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-leave-wfh-apllication-component',
  imports: [ReactiveFormsModule],
  templateUrl: './leave-wfh-apllication-component.html',
  styleUrl: './leave-wfh-apllication-component.css',
})
export class LeaveWfhApllicationComponent {

  loggedIn:boolean = false;

  constructor(
    private leaveService: LeaveService,
    private loginService: LoginService
  ) {
    if (localStorage.getItem('lastId') == null) {
      localStorage.setItem('lastId', '1010');
    }
    this.loggedIn= this.loginService.loggedIn()
  }

  id = Number(localStorage.getItem('lastId'));
  applicationGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.minLength(3)]),
    reason: new FormControl('', [Validators.required, Validators.minLength(3)]),
    from: new FormControl(new Date()),
    to: new FormControl(new Date()),
  });

  get type() {
    return this.applicationGroup.get('type');
  }
  get reason() {
    return this.applicationGroup.get('reason');
  }
  get from() {
    return this.applicationGroup.get('from');
  }
  get to() {
    return this.applicationGroup.get('to');
  }

  applyLeave() {
    let newApplication: EmpApplications = {
      id: this.id.toString(),
      appliedBy: this.loginService.currUser.id,
      type: this.type?.value ?? '',
      reason: this.reason?.value ?? '',
      from: this.from?.value ?? new Date(),
      to: this.to?.value ?? new Date(),
      status: 'pending',
    };

    localStorage.setItem('lastId', (this.id+1).toString());

    this.leaveService.createNewApplication(newApplication).subscribe(()=>{
      console.log(newApplication);
    });

    this.applicationGroup.reset();

  }

  onSubmit() {}
}
