import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout-component.html',
  styleUrl: './logout-component.css',
})
export class LogoutComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.loginService.loggedIn.set(false);
      this.loginService.logInTypeUser.set(true);
      this.loginService.currUser = {
        id: '',
        name: '',
        password: '',
        projects: [],
        attendance: -1,
        leavesLeft: -1,
        wfhLeft: -1,
        roles: [],
      };
      this.router.navigate(['/login']);
    }, 1000);
  }
}
