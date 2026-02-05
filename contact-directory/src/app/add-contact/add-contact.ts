import { Component } from '@angular/core';
import { CountryCode } from '../services/country-code';
import { FormsModule, NgForm } from '@angular/forms';
import { Contacts } from '../services/contacts';
import { Contact } from '../model/contact.model';
import { CommonModule } from '@angular/common';
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact {
  countryCodeList:any;
  phoneExists : boolean = false;
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
    if(!this.contacts.isPhoneNoUnique(contact.countryCode+contact.phoneNo)){
      this.phoneExists = true;
      this.reset(form);
      return;
    }
    contact.id = crypto.randomUUID();
    this.contacts.addContact(contact);
    this.reset(form);
    this.phoneExists = false;
    return;
  }

  reset(form: NgForm){
    form.resetForm();
  }

  validNumber(countryCode: string, phoneNo: string):boolean{
    const number = countryCode+phoneNo;
    console.log(number);
    return (isPossiblePhoneNumber(number) && isValidPhoneNumber(number));
  }
}
