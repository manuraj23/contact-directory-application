import { Component } from '@angular/core';
import { CountryCode } from '../services/country-code';
import { FormsModule, NgForm } from '@angular/forms';
import { Contacts } from '../services/contacts';
import { Contact } from '../model/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact {
  countryCodeList:any
  constructor(private contacts:Contacts , private countryCode:CountryCode){}

  ngOnInit(){
    this.getCountryCode();
  }

  getCountryCode(){
    this.countryCode.getCountryCode().subscribe((data:any)=>{
      this.countryCodeList = data;
    })
  }

  save(form: NgForm, contact: Contact){
    this.contacts.addContact(contact);
    this.reset(form);
  }

  reset(form: NgForm){
    form.resetForm();
  }
}
