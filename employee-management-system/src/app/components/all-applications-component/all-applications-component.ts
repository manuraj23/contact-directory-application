import { Component, computed, signal } from '@angular/core';
import { LeaveService } from '../../services/leave-service';
import { EmpApplications } from '../../interfaces/emp-applications';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-all-applications-component',
  imports: [],
  templateUrl: './all-applications-component.html',
  styleUrl: './all-applications-component.css',
})
export class AllApplicationsComponent {
  constructor(
    private leaveService: LeaveService,
    private loginService: LoginService,
  ) {}

  allApplications = signal<EmpApplications[]>([]);
  allReviewdApplications = signal<EmpApplications[]>([]);

  ngOnInit() {
    if (this.loginService.loggedIn() && !this.loginService.logInTypeUser()) {
      this.leaveService.fetchAllApplications().subscribe((data) => {
        this.allApplications.set(
          data
          .filter((x)=>{return x.status=="pending"})
          .sort((a, b) => b.from.toString().localeCompare(a.from.toString())),
        );

        this.allReviewdApplications.set(
          data
          .filter((x)=>{return !(x.status=="pending")})
          .sort((a, b) => b.from.toString().localeCompare(a.from.toString())),
        );
      });
    }
  }

  approveApplication(id: string) {
    this.leaveService.updateApplication(id,"approved");
  }
  declineApplication(id: string) {
    this.leaveService.updateApplication(id,"rejected");
  }
}
