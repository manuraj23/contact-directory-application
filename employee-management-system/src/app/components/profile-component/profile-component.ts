import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-profile-component',
  imports: [],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent {

  constructor(private loginService : LoginService){}
  currUser!:UserData;

  ngOnInit(){
    this.currUser = this.loginService.currUser;
  }
}
