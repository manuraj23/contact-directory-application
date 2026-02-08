import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authUser } from './core/data/authuser';
import { attend } from './core/data/attend';

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
  }
}
