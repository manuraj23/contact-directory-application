import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Contact } from '../view-contact/contactinterface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  imports: [CommonModule, ReactiveFormsModule, JsonPipe, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact implements OnInit {

  countryCodes: {
    name: string;
    dial_code: string;
    code: string;
  }[] = [];

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http : HttpClient) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      countryCode: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]],
    });

    this.loadCountryCodes();
  }

  loadCountryCodes() {
    this.http.get<any[]>('https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json').subscribe((data) => {
      this.countryCodes = data.sort((a,b) => a.name.localeCompare(b.name));
    })
  }

  AddContact() {
    if (this.contactForm.invalid) {
      return;
    }

    const newContact: Contact = this.contactForm.value;

    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];

    contacts.push(newContact);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    alert("Contact Saved Successfully");

    this.contactForm.reset({
      name: '',
      countryCode: null,
      contactNumber: '',
    });


  }
}
