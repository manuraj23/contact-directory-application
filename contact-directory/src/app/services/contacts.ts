import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

const STORAGE_KEY = "contacts";

export type SortOrder = 'asc' | 'desc';

@Injectable({
  providedIn: 'root',
})

export class Contacts {
  
  getContacts(sortOrder: SortOrder = 'asc'): Contact[] {
    const ContactList: Contact[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return ContactList.sort((a, b)=> {
      const result = a.name.localeCompare(b.name); 
      return sortOrder === 'asc' ? result : -result});
  }

  isPhoneNoUnique(phoneNo: string): boolean{
    const constacts = this.getContacts();
    return !constacts.some(cont => cont.countryCode+cont.phoneNo === phoneNo);
  }

  addContact(contact: Contact) {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  searchContacts(term: string): Contact[] {
    const lower = term.toLowerCase();

    return this.getContacts().filter(cont =>
      cont.name.toLowerCase().includes(lower) || cont.phoneNo.includes(lower)
    );
  }

  deleteContact(id: string) {
    const contacts = this.getContacts().filter(cont => cont.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }
}
