import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ContactData } from '../interfaces/contactData';

@Component({
  selector: 'app-contact-card',
  imports: [],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.css',
})
export class ContactCard {
  @Input() contactData!: ContactData;

  buttonText: string = 'Copy';

  copyToClipboard() {
    navigator.clipboard.writeText(this.contactData?.contactId ?? '');
    this.buttonText = 'Copied!!';
    setTimeout(() => {
      this.buttonText = 'Copy';
    }, 1500);
  }
  
  deleteContact(key: string) {
    if (key !== '') {
      if (confirm('Do you want to delete the contact?')) {
        localStorage.removeItem(key);
        alert('Contact Deleted!!');
      }
    } else {
      alert('Error occured!!');
    }
  }
}
