import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactService } from '../contact';
import { Contact } from '../contact.model';
import { CountryCode } from '../country-code.model';

//import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

//  Import CountryCode type used by libphonenumber-js (TYPE ONLY)
import type { CountryCode as LibCountryCode } from 'libphonenumber-js';


@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.html',
  styleUrls: ['./add-contact.css']
})
export class AddContactComponent implements OnInit {

  // Holds country codes fetched from API
  countryCodes: CountryCode[] = [];
  
  //  Used to show phone validation error message in UI
  phoneError: string = '';

  // Model bound to the form
  contact: Contact = {
    id:0,
    name: '',
    countryCode: '',
    phone: ''
  };

  constructor(private contactService: ContactService) {}

  // Runs when component loads
  ngOnInit(): void {
    

    this.loadCountryCodes();
    const contactToEdit = this.contactService.getContactToEdit();

if (contactToEdit) {
  this.contact = { ...contactToEdit };
}
  }

  // Fetch country codes from service
  loadCountryCodes(): void {
    this.contactService.getCountryCodes().subscribe(data => {
      this.countryCodes = data;
    });
  }

  // Called on form submit
  addContact(form: any): void {
  if (form.invalid) {
    return;
  }
   /*
       PHONE VALIDATION LOGIC
      - Find the selected country object using dial code
      - Extract ISO country code (e.g. IN, US)
      - Validate phone number using libphonenumber-js
    */
    const selectedCountry = this.countryCodes.find(
      c => c.dial_code === this.contact.countryCode
    );

    if (selectedCountry) {
    
      const fullPhoneNumber = `${selectedCountry.dial_code}${this.contact.phone}`;

const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);


      // If phone number is invalid for selected country → stop
      if (!phoneNumber || !phoneNumber.isValid()) {
        this.phoneError = 'Please enter a valid phone number for the selected country';
        return;
      }
    }

  if (this.contact.id) {
  this.contactService.updateContact(this.contact);
  alert('Contact updated successfully');
} else {
  this.contactService.addContact(this.contact);
  alert('Contact added successfully');
}

this.contactService.clearContactToEdit();

  
form.resetForm({
  name: '',
  countryCode: '',
  phone: ''
});

}

}
