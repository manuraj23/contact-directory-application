import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  constructor(private loginService : LoginService){}
  loggedIn: boolean = false;
    ngOnInit(){
      this.loggedIn = this.loginService.loggedIn();
    }
}
