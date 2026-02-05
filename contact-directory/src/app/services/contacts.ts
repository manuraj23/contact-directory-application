import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

const STORAGE_KEY = "contacts";

@Injectable({
  providedIn: 'root',
})

export class Contacts {
  
  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  addContact(contact: Contact) {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  searchContacts(term: string): Contact[] {
    const lower = term.toLowerCase();

    return this.getContacts().filter(cont =>
      cont.name.toLowerCase().includes(lower)
    );
  }

  deleteContact(id: string) {
    const contacts = this.getContacts().filter(cont => cont.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }
}
