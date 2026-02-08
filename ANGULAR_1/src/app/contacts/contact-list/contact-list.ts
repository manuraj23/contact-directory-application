import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactService } from '../contact';
import { Contact } from '../contact.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactListComponent implements OnInit {

  // Holds all contacts to display
  contacts: Contact[] = [];

  // Search input value
  searchText: string = '';

 constructor(
  private contactService: ContactService,
  private router: Router
) {}

  // Runs when component loads
  ngOnInit(): void {
    this.loadContacts();
  }

  // Load all contacts initially
  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }
  editContact(contact: Contact): void {
  this.contactService.setContactToEdit(contact);
  this.router.navigate(['/add']);
}

deleteContact(id: number): void {
  this.contactService.deleteContact(id);
  this.loadContacts();
}


  // Called whenever user types in search box
  onSearch(): void {
    if (this.searchText.trim() === '') {
      // If search box is empty, show all contacts
      this.loadContacts();
    } else {
      // Otherwise, show filtered contacts
      this.contacts = this.contactService.searchContacts(this.searchText);
    }
  }
}
