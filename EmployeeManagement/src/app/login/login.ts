import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  @Output() pageChange = new EventEmitter<string>();

  constructor(private authService: Auth) {}

   isLoginMode = true;

  role = 'employee';
  loginEmail = '';
  loginPassword = '';

  firstName = '';
  lastName = '';
  signupEmail = '';
  signupPassword = '';
  rePassword = '';

  dob = '';
  gender = '';
  mobile = '';

  address = '';
  city = '';
  state = '';
  pincode = '';

  emergencyName = '';
  emergencyMobile = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  signup() {

    if (this.signupPassword !== this.rePassword) {
      alert('Passwords do not match');
      return;
    }

    const result = this.authService.signupUser({
       firstName: this.firstName,
      lastName: this.lastName,
      email: this.signupEmail,
      password: this.signupPassword,
      role: 'employee',

      dob: this.dob,
      gender: this.gender,
      mobile: this.mobile,

      address: this.address,
      city: this.city,
      state: this.state,
      pincode: this.pincode,

      emergencyName: this.emergencyName,
      emergencyMobile: this.emergencyMobile
    });

    alert(result);

    if (result === 'Signup successful') {
      this.toggleMode();
    }
  }

  login() {

    const result = this.authService.loginUser(
      this.role,
      this.loginEmail,
      this.loginPassword
    );

    if (result === 'hr') {
      this.pageChange.emit('hr');
    }

    else if (result === 'employee') {

      const users = this.authService.getUsers();
      const validUser = users.find(
        u => u.email === this.loginEmail && u.password === this.loginPassword
      );

      localStorage.setItem('currentUser', JSON.stringify(validUser));

      this.pageChange.emit('employee');
    }

    else {
      alert(result);
    }
  }
}
