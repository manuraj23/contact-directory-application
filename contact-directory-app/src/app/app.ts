import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import CountryList from 'country-list-with-dial-code-and-flag';
import { ContactCard } from './contact-card/contact-card';
import { ContactData } from './interfaces/contactData';
import { CountryCode } from './interfaces/countryCode';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, ContactCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('contact-directory-app');

  countryCodes: CountryCode[] = CountryList.getAll().map((countryCode) => {
    return {
      counName: countryCode.localName,
      counCode: countryCode.dial_code,
    };
  });

  contactForm = new FormGroup({
    contactName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    counCode: new FormControl<string>('', [Validators.required]),
    contactNum: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
  });

  isSubsequence(s: string, t: string) {
    let i = 0;
    let j = 0;
    while (i < s.length && j < t.length) {
      if (s.charAt(i) === t.charAt(j)) {
        i++;
      }
      j++;
    }
    return i === s.length;
  }

  get contactName() {
    return this.contactForm.get('contactName');
  }

  get counCode() {
    return this.contactForm.get('counCode');
  }

  get contactNum() {
    return this.contactForm.get('contactNum');
  }

  allContacts: ContactData[] = [];

  getAllContacts() {
    this.allContacts = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let contact: ContactData = {
        contactId: key ?? '',
        contactName: localStorage.getItem(key ?? '') ?? '',
      };
      this.allContacts.push(contact);
    }
  }
  filteredContacts: ContactData[] = [];

  getFilteredContacts(): ContactData[] {
    let numPattern = this.counCode?.value + '-' + this.contactNum?.value;
    let namePattern = (this.contactName?.value ?? '').toLowerCase();

    return this.allContacts.filter(
      (contact) =>
        this.isSubsequence(namePattern, contact.contactName.toLowerCase()) &&
        this.isSubsequence(numPattern, contact.contactId),
    );
  }

  searchContacts() {
    console.log('serach called');
    this.getAllContacts();
    console.log(this.allContacts);
    this.filteredContacts = this.getFilteredContacts();
    console.log(this.filteredContacts);
  }

  createContact() {
    let contactId: string = this.counCode?.value + '-' + this.contactNum?.value;
    if(localStorage.getItem(contactId)!==null){
      alert('Contact Exists!!!')
      return;
    }
    let contactName: string = this.contactName?.value ?? '';
    localStorage.setItem(contactId, contactName);
    alert('new contact created!');
    this.contactForm.setValue({
      contactName: '',
      counCode: '',
      contactNum: '',
    });
  }

  ngOnInit() {

    this.searchContacts();

    this.contactName?.valueChanges.subscribe((value) => {
      console.log('Input changed:', value);
      this.searchContacts();
    });

    this.counCode?.valueChanges.subscribe((value) => {
      console.log('country code changed:', value);
      this.searchContacts();
    });

    this.contactNum?.valueChanges.subscribe((value) => {
      console.log('Contact Number changed:', value);
      this.searchContacts();
    });
  }

  onSubmit() {}
}
