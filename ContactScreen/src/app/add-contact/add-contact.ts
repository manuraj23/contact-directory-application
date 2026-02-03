import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Contact } from '../contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-contact.html',
  styleUrls: ['./add-contact.css']
})

export class AddContact implements OnInit {

  name = '';
  phone = '';
  selectedCountryCode = '';
  countries: { name: string; dialCode: string }[] = [];
  loading = true;

  constructor(private http: HttpClient, private contactService: Contact) {

  }

  ngOnInit(): void {
    this.http.get<any[]>('https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json')
      .subscribe({
        next: data => {
          this.countries = data
            .map(c => ({
              name: c.name,
              dialCode: c.dial_code
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

          this.loading = false;
        },
        error: err => {
          console.error('Failed to load country codes', err);
          this.loading = false;
        }
      });
  }

  addContact() {
    if (!this.selectedCountryCode) {
      alert('Please select a country code!');
      return;
    }

    const phoneRange = /^[0-9]{10}$/;
    if (!phoneRange.test(this.phone)) {
      alert('Phone must be numeric and exactly 10 digits.');
      return;
    }

    const isDuplicate = this.contactService.getContacts().some(c =>
      c.name.toLowerCase() === this.name.toLowerCase() ||
      c.phone === this.phone
    );

    if (isDuplicate) {
      alert('Contact with same name or phone already exists!');
      return;
    }

    this.contactService.saveContact({
      name: this.name,
      phone: this.phone,
      country: this.selectedCountryCode
    });

    this.name = '';
    this.phone = '';
    this.selectedCountryCode = '';
  }
}