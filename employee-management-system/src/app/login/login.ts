import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router:Router){}

  onLogin(loginDetails: any){
    const users = JSON.parse(localStorage.getItem('authUser')|| '[]');

    const user = users.find(
      (u:any)=> u.username === loginDetails.username && u.password === loginDetails.password
    )

    if(!user){
      alert('Invalid credentials')
      return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigateByUrl("attendance");
    return user;
  }

}
