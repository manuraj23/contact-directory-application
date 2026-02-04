import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact';

interface Country {
  name: string;
  dialCode: string;
  code: string;
}

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
  selectedCountry = '';
  countries: Country[] = [];
  phoneLength: Record<string, number> = {};
  loading = true;

  constructor(private http: HttpClient, private contactService: Contact) {

  }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchPhoneRules();
  }

  private fetchCountries(): void {
    this.http
      .get<any[]>('https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json')
      .subscribe(data => {
        this.countries = data
          .map(c => ({
            name: c.name,
            dialCode: c.dial_code,
            code: c.code
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        this.loading = false;
      });
  }

  private fetchPhoneRules(): void {
    this.http
      .get<Record<string, number>>('country-length.json')
      .subscribe(map => {
        this.phoneLength = map;
      });
  }

  addContact(): void {
    if (!this.selectedCountry) {
      alert('Please select a country');
      return;
    }

    const requiredLength = this.phoneLength[this.selectedCountry];

    if (!requiredLength) {
      alert('Phone rule not available for this country');
      return;
    }

    const isValid = /^[0-9]+$/.test(this.phone) && this.phone.length === requiredLength;

    if (!isValid) {
      alert(`Phone number must be exactly ${requiredLength} digits`);
      return;
    }

    const duplicate = this.contactService.getContacts().some(c =>
      c.name.toLowerCase() === this.name.toLowerCase() ||
      c.phone === this.phone
    );

    if (duplicate) {
      alert('Contact already exists');
      return;
    }

    const countryInfo = this.countries.find(c => c.name === this.selectedCountry);

    this.contactService.saveContact({
      name: this.name.trim(),
      phone: this.phone,
      country: `${countryInfo?.dialCode} (${this.selectedCountry})`
    });

    this.clearForm();
  }

  private clearForm(): void {
    this.name = '';
    this.phone = '';
    this.selectedCountry = '';
  }
}