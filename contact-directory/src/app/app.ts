import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Contacts } from './services/contacts';
import { DummyContacts } from './data/dummy-contacts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  ngOnInit(){
    if (!localStorage.getItem('contacts')) {
      localStorage.setItem('contacts', JSON.stringify(DummyContacts));
    }
  }
}
