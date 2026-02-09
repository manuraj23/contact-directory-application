import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,

  // Importing modules required for forms and basic Angular directives
  imports: [CommonModule, FormsModule],

  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  // Stores the username entered by the user
  username: string = '';

  // Stores selected role (default is 'user')
  role: 'user' | 'hr' = 'user';

  constructor(private router: Router) {}

  // Called when user clicks Login button
  login(): void {

    // Basic validation: username should not be empty
    if (!this.username.trim()) {
      alert('Please enter username');
      return;
    }

    // Store logged-in user details in localStorage
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        username: this.username,
        role: this.role
      })
    );

    // Redirect based on role
    if (this.role === 'user') {
      this.router.navigate(['user']);
    } else {
      this.router.navigate(['hr']);
    }
  }
}

