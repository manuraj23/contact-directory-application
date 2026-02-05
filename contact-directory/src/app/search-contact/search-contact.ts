import { Component } from '@angular/core';
import { Contacts } from '../services/contacts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact } from '../model/contact.model';

@Component({
  selector: 'app-search-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-contact.html',
  styleUrl: './search-contact.css',
})
export class SearchContact {
  sortOrder: 'asc' | 'desc' = 'asc';
  searchText = '';
  contactList: Contact[] = [];

  constructor(private contacts:Contacts){}

  ngOnInit(){
    this.showAll();
  }

  showAll(){
    this.contactList = this.contacts.getContacts(this.sortOrder);
  }

  onSearch() {
    if (!this.searchText.trim()) {
      this.showAll();
    } else {
      this.contactList = this.contacts.searchContacts(this.searchText);
    }
  }
  
  delete(id: string) {
    this.contacts.deleteContact(id);
    this.showAll();
  }

  sortToggle(){
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.showAll();
  }
}
