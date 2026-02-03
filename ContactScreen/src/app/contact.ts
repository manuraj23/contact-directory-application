import { Injectable, signal } from '@angular/core';

export interface ContactModel {
  name: string;
  phone: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class Contact {

  private storageKey = 'contacts';

  // track contacts
  contactsSignal = signal<ContactModel[]>(this.getContacts());

  getContacts(): ContactModel[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveContact(contact: ContactModel) {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));

    // Update signal 
    this.contactsSignal.set(contacts);
  }
  deleteContact(index: number) {
  const contacts = this.getContacts();
  contacts.splice(index, 1); // remove the contact
  localStorage.setItem(this.storageKey, JSON.stringify(contacts));

  this.contactsSignal.set(contacts);
}

}
