import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddService } from '../service/add.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  contactForm!: FormGroup;
  selectedCountry: any;

  countries = [
    { name: 'India', code: '+91', flag: '🇮🇳', length: 10 },
    { name: 'USA', code: '+1', flag: '🇺🇸', length: 10 },
    { name: 'UK', code: '+44', flag: '🇬🇧', length: 10 }
  ];

  constructor(
    private fb: FormBuilder,
    private addService: AddService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  onCountryChange() {
    const countryName = this.contactForm.value.country;
    this.selectedCountry = this.countries.find(c => c.name === countryName);
    this.contactForm.get('mobile')?.reset();
  }

  isMobileValid(): boolean {
    if (!this.selectedCountry) return false;
    return this.contactForm.value.mobile?.length === this.selectedCountry.length;
  }

  saveContact() {
    if (this.contactForm.invalid || !this.isMobileValid()) return;

    const payload = {
      name: this.contactForm.value.name,
      countryCode: this.selectedCountry.code,
      mobile: this.contactForm.value.mobile
    };

    this.addService.addUser(payload).subscribe({
      next: () => {
        alert('Contact saved successfully ');
        this.contactForm.reset();
      },
      error: () => alert('Error saving contact ')
    });
  }
}
