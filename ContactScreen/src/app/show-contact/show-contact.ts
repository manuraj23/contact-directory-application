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

  get filteredContacts(): ContactModel[] {

    const allContacts = this.contactService.contactsSignal();
    let filtered = [...allContacts]; // copy to avoid mutating signal array

    if (this.searchName) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    if (this.searchPhone) {
      filtered = filtered.filter(c =>
        c.phone.includes(this.searchPhone)
      );
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }

  delete(contact: ContactModel) {
    this.contactService.deleteContact(contact);
  }
}
