import { Component } from '@angular/core';
import { View } from '../service/view';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-contact.html',
  styleUrl: './view-contact.css',
})
export class ViewContact {
  contactData: any[] = [];
  searchText: string = '';

  constructor(private view: View) {}

  ngOnInit() {
    this.view.viewContact().subscribe((data: any[]) => {
      this.contactData = data;
      console.log('Contact data:', data);
    });
  }

  get filteredContacts() {
    if (!this.searchText) {
      return this.contactData;
    }

    const search = this.searchText.toLowerCase();

    return this.contactData.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.mobileNumber.toString().includes(search) ||
      user.countryCode.toLowerCase().includes(search)
    );
  }
}
