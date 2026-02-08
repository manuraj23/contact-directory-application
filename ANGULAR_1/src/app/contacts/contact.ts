import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact.model';
import { CountryCode } from './country-code.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private storageKey = 'contacts';

  // Public API URL for country codes
  private countryCodeApi =
    'https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json';

    private contactToEdit: Contact | null = null;

  constructor(private http: HttpClient) {}

  // ---------------- CONTACT LOGIC ----------------

  getContacts(): Contact[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contact.id = Date.now(); // give a simple unique id to each contact 
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }
  updateContact(updatedContact: Contact): void {
  const contacts = this.getContacts().map(contact =>
    contact.id === updatedContact.id ? updatedContact : contact
  );

  localStorage.setItem('contacts', JSON.stringify(contacts));
}
deleteContact(id: number): void {
  const contacts = this.getContacts().filter(contact => contact.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}


  searchContacts(searchText: string): Contact[] {
  const contacts = this.getContacts();
  const term = searchText.toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(term) ||
    contact.countryCode.includes(searchText) ||
    contact.phone.toString().includes(searchText)
  );
}
setContactToEdit(contact: Contact): void {
  this.contactToEdit = contact;
}

getContactToEdit(): Contact | null {
  return this.contactToEdit;
}

clearContactToEdit(): void {
  this.contactToEdit = null;
}

  // ---------------- COUNTRY CODE API ----------------

  // Fetch country codes from public API
  getCountryCodes(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>(this.countryCodeApi);
  }
}
