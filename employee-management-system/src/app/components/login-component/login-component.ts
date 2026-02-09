import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { UserData } from '../../interfaces/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  loginGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get userId() {
    return this.loginGroup.get('userId');
  }

  get password() {
    return this.loginGroup.get('password');
  }

  employees: UserData[] = [];

  validateUser() {
    let user: UserData[] = this.employees.filter((x) => {
      return x.id === this.userId?.value;
    });
    if (user.length == 0 || user[0].password !== this.password?.value) {
      alert('No such User !!');
      return;
    }

    this.loginService.currUser = user[0];
    this.loginService.loggedIn.set(true);
    if (user[0].roles.find((x) => x == 'HR')) {
      this.loginService.logInTypeUser.set(false);
    }
    console.log(this.loginService.logInTypeUser());

    this.loginGroup.setValue({
      userId: '',
      password: '',
    });
    this.router.navigate(['/profile']);
  }

  ngOnInit() {
    this.loginService.fetchAllUsers().subscribe((data) => {
      this.employees = data;
    });
    this.userId?.valueChanges.subscribe((data) => {});
    this.password?.valueChanges.subscribe((data) => {});
  }

  onSubmit() {}
}
