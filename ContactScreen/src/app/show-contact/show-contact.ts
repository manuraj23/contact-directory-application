import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact, ContactModel } from '../contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './show-contact.html',
  styleUrls: ['./show-contact.css']
})
export class ShowContact {

  searchName = '';
  searchPhone = '';

  constructor(public contactService: Contact) {}

  // Filter contacts only if user typed something
  get filteredContacts(): ContactModel[] {
    const allContacts = this.contactService.contactsSignal();

    let filtered = allContacts;

    // by name 
    if (this.searchName) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    // by phone 
    if (this.searchPhone) {
      filtered = filtered.filter(c =>
        c.phone.includes(this.searchPhone)
      );
    }

    
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }
}
