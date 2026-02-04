import { Component } from '@angular/core';
import { Contacts } from '../services/contacts';

@Component({
  selector: 'app-search-contact',
  imports: [],
  templateUrl: './search-contact.html',
  styleUrl: './search-contact.css',
})
export class SearchContact {
  contactList : any
  constructor(private contacts:Contacts){}
  
  ngOnInit(){
    this.contacts.getContacts().subscribe((data:any)=>{
      this.contactList = data;
    })
  }
}
