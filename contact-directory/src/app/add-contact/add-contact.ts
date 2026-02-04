import { Component } from '@angular/core';
import { CountryCode } from '../services/country-code';

@Component({
  selector: 'app-add-contact',
  imports: [],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact {
  countryCodeList:any
  constructor(private countryCode:CountryCode){}

  ngOnInit(){
    this.countryCode.getCountryCode().subscribe((data:any)=>{
      this.countryCodeList = data;
    })
  }
}
