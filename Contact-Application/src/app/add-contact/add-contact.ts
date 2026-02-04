import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { View } from '../service/view';

@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.css',
})
export class AddContact {
  name = new FormControl('');
  countryCode = new FormControl('');
  phoneNumber = new FormControl('');

  constructor(private view: View) { }

  addContact() {
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

      // optional reset
      this.name.reset();
      this.countryCode.reset();
      this.phoneNumber.reset();
    });
    // if (name && countryCode && phoneNumber) {

    // }
    // alert(`Contact Added:\nName: ${name}\nPhone: +${countryCode}-${phoneNumber}`);
  }

}
