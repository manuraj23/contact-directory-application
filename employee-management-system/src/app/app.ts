import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authUser } from './core/data/authuser';
import { attend } from './core/data/attend';
import { profile } from './core/data/profile';
import { projects } from './core/data/projects';
import { leave } from './core/data/leave';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  ngOnInit(){
    if (!localStorage.getItem('authUser')) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    if (!localStorage.getItem('attendance')) {
      localStorage.setItem('attendance', JSON.stringify(attend));
    }
    if (!localStorage.getItem('profile')) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    if (!localStorage.getItem('projects')) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    if (!localStorage.getItem('leaveRequests')) {
      localStorage.setItem('leaveRequests', JSON.stringify(leave));
    }
  }
}
