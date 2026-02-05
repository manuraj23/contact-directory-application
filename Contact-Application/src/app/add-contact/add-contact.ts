import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { View } from '../service/view';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact {

  constructor(private view: View) { }

  countryCodes: any[] = [];
  ngOnInit(): void {
    this.loadCountryCodes();
    this.countryCode.valueChanges.subscribe(() => {
      this.phoneNumber.updateValueAndValidity();
    });
  }

  loadCountryCodes() {
    this.view.getCountryCodes().subscribe((res: any[]) => {
      this.countryCodes = res;
    });
  }

  phoneLengthValidator = (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const country = this.countryCode.value;
    if (!phone || !country) return null;
    const length = phone.length;
    const tenDigitCountryCodes = ['+91', '+1', '+7', '+86', '+33'];
    // +91 → India
    // +1  → USA
    // +7  → Russia
    // +86 → China
    // +33 → France
    // Ethiopia → 9 digits (+251)
    if (country === '+251') {
      return length === 9 ? null : { invalidLength: true };
    }
    if (tenDigitCountryCodes.includes(country)) {
      return length === 10 ? null : { invalidLength: true };
    }
    return length >= 8 && length <= 12 ? null : { invalidLength: true };
  };

  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  countryCode = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  // phoneNumber = new FormControl('', {
  //   nonNullable: true,
  //   validators: [Validators.required, Validators.minLength(8), Validators.maxLength(12)],
  // });
  phoneNumber = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, this.phoneLengthValidator],
  });







  addContact() {
    if (this.name.invalid || this.countryCode.invalid || this.phoneNumber.invalid) {
      this.name.markAsTouched();
      this.countryCode.markAsTouched();
      this.phoneNumber.markAsTouched();
      return;
    }
    let name = this.name.value;
    let countryCode = this.countryCode.value;
    let mobileNumber = this.phoneNumber.value;

    let data = {
      name: name,
      countryCode: countryCode,
      mobileNumber: mobileNumber,
      // phone: `+${countryCode}-${phoneNumber}`
    };

    this.view.addContact(data).subscribe(() => {
      alert(`Contact Added:
      Name: ${data.name}
      Phone: ${data.countryCode}-${data.mobileNumber}`);

      this.name.reset();
      this.countryCode.reset();
      this.phoneNumber.reset();
    });
  }


}
