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
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private view: View) { }

  ngOnInit() {
    this.view.viewContact().subscribe((data: any[]) => {
      this.contactData = data;
      // console.log('Contact data:', data);
    });
  }




  get filteredContacts() {
    let contacts = this.contactData;

    // 🔍 Search
    if (this.searchText.trim() !== '') {
      const search = this.searchText.toLowerCase();
      contacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search) ||
        contact.mobileNumber.includes(search)
      );
    }

    // 🔃 Sort
    contacts = [...contacts].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      return this.sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    return contacts;

  }
}
