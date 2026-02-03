import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactService } from '../contact';
import { Contact } from '../contact.model';
import { CountryCode } from '../country-code.model';

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

  // Model bound to the form
  contact: Contact = {
    name: '',
    countryCode: '',
    phone: ''
  };

  constructor(private contactService: ContactService) {}

  // Runs when component loads
  ngOnInit(): void {
    this.loadCountryCodes();
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

  this.contactService.addContact(this.contact);

  alert('Contact added successfully');

  this.contact = {
    name: '',
    countryCode: '',
    phone: ''
  };

  form.resetForm();
}

}
