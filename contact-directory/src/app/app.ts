import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Contacts } from './services/contacts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  contactList : any
  constructor(private contacts:Contacts){}
  
  ngOnInit(){
    this.contacts.getContacts().subscribe((data:any)=>{
      this.contactList = data;
    })
  }
}
