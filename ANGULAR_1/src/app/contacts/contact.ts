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

  constructor(private http: HttpClient) {}

  // ---------------- CONTACT LOGIC ----------------

  getContacts(): Contact[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
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


  // ---------------- COUNTRY CODE API ----------------

  // Fetch country codes from public API
  getCountryCodes(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>(this.countryCodeApi);
  }
}
