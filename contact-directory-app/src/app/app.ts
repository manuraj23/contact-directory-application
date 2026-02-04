import { Component, signal } from '@angular/core';
import parsePhoneNumber from 'libphonenumber-js';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactCard } from './contact-card/contact-card';
import { ContactData } from './interfaces/contactData';
import { CountryCode } from './interfaces/countryCode';
import { CountryCodeService } from './service/country-code-service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, ContactCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('contact-directory-app');

  constructor(private countryCodeService: CountryCodeService) {}

  countryCodes: CountryCode[] = [];

  setCounCodes() {
    this.countryCodeService.getAllCouncode().subscribe((data) => {
      console.log(data);
      this.countryCodes = data.map((elem) => ({
        counName: elem.name,
        counDialCode: elem.dial_code,
        counCode: elem.code,
      }));
    });
  }

  validateNumber(phone: string, code: string):boolean {
    const phoneNumber = parsePhoneNumber(phone, { defaultCallingCode: code });
    return (phoneNumber && phoneNumber.isValid() || false);
  }

  contactForm = new FormGroup({
    contactName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    counCode: new FormControl<string>('', [Validators.required]),
    contactNum: new FormControl<string>('', [Validators.required]),
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
    this.getAllContacts();
    this.filteredContacts = this.getFilteredContacts();
  }

  createContact() {
    let contactId: string = this.counCode?.value + '-' + this.contactNum?.value;
    if (localStorage.getItem(contactId) !== null) {
      alert('Contact Exists!!!');
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

  validNumber:boolean = false;

  ngOnInit() {
    this.setCounCodes();

    this.contactName?.valueChanges.subscribe((value) => {
      this.searchContacts();
    });

    this.counCode?.valueChanges.subscribe((value) => {
      let counDetails = this.countryCodes.filter((x) => x.counDialCode === this.counCode?.value)
      let contact = (this.counCode?.value ?? '').concat(this.contactNum?.value ?? '');
      console.log(contact, counDetails[0].counCode);
      this.validNumber = this.validateNumber(contact, counDetails[0].counCode);
      console.log(this.validNumber);
      this.searchContacts();
    });

    this.contactNum?.valueChanges.subscribe((value) => {
      let counDetails = this.countryCodes.filter((x) => x.counDialCode === this.counCode?.value)
      let contact = (this.counCode?.value ?? '').concat(this.contactNum?.value ?? '');
      console.log(contact, counDetails[0].counCode);
      this.validNumber = this.validateNumber(contact, counDetails[0].counCode);
      console.log(this.validNumber);
      this.searchContacts();
    });
  }

  onSubmit() {}
}
