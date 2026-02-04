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
  contactsSignal = signal<ContactModel[]>(this.getContacts());

  private getContacts(): ContactModel[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveContact(contact: ContactModel) {
    const updated = [...this.contactsSignal(), contact];
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    this.contactsSignal.set(updated);
  }

  deleteContact(contact: ContactModel) {
    const updated = this.contactsSignal().filter(c => c.phone !== contact.phone);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    this.contactsSignal.set(updated);
  }
}
