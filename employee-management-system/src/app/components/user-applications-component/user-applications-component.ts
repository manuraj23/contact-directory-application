import { Component } from '@angular/core';
import { LeaveService } from '../../services/leave-service';
import { LoginService } from '../../services/login-service';
import { EmpApplications } from '../../interfaces/emp-applications';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-user-applications-component',
  imports: [],
  templateUrl: './user-applications-component.html',
  styleUrl: './user-applications-component.css',
})
export class UserApplicationsComponent {
  constructor(private loginService : LoginService,private leaveService:LeaveService){}
  currUser!:UserData;
  userApplications: EmpApplications[] = [];
  reviewedApplications: EmpApplications[] = [];
  ngOnInit(){
    this.currUser = this.loginService.currUser;
    this.leaveService.fetchAllApplications().subscribe((data)=>{

      this.userApplications = data.filter((x) =>{
        return (x.appliedBy == this.currUser.id && x.status=="pending")
      }).sort((a,b) => (b.from.toString()).localeCompare(a.from.toString()))

      this.reviewedApplications = data.filter((x) =>{
        return (x.appliedBy == this.currUser.id && x.status!="pending")
      }).sort((a,b) => (b.from.toString()).localeCompare(a.from.toString()))
    })
  }

  cancelApplication(id:string){
    this.leaveService.deleteApplication(id);
  }

}
