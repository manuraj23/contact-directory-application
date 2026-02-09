import { ChangeDetectorRef, Component, computed, signal, Signal } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoutingOption } from '../../interfaces/routing-options';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  hrOptions: RoutingOption[] = [
    {
      option: 'Leave Requests',
      routingUrl: '/leave-requests',
    },
    {
      option: 'Employee Directory',
      routingUrl: '/employee-directory',
    },
  ];
  
  userOptions: RoutingOption[] = [
    {
      option: 'Apply Leaves & WFH',
      routingUrl: '/apply-leave-wfh',
    },
    {
      option: 'Applications',
      routingUrl: '/all-user-applications',
    },
  ];

  constructor(private loginService: LoginService) {}
  
  loggedIn!:Signal<boolean>;
  logInTypeUser!:Signal<boolean>;

  navOptions = computed(() => {
    if (this.logInTypeUser()) {
      return this.userOptions;
    } else {
      return this.hrOptions;
    }
  });

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;
    this.logInTypeUser = this.loginService.logInTypeUser;
  }
}
