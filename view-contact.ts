import { Component, OnInit } from '@angular/core';
import { Contact } from './contactinterface';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/input";
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';




@Component({
  selector: 'app-view-contact',
  imports: [CommonModule, MatFormField, MatLabel, FormsModule, MatInputModule],
  templateUrl: './view-contact.html',
  styleUrl: './view-contact.css',
})
export class ViewContact implements OnInit {
  
  allContacts : Contact[] = [];
  filteredContacts : Contact[] = [];
  searchText : string = '';

  ngOnInit() {
    const storedContacts = localStorage.getItem('contacts');

    this.allContacts = storedContacts ? JSON.parse(storedContacts) as Contact[] : [];

    this.allContacts.sort((a,b) => a.name.localeCompare(b.name));

    this.filteredContacts = [...this.allContacts];
  }

  onSearch() {
    const searchValue = this.searchText.toLowerCase();

    this.filteredContacts = this.allContacts.filter(contact => contact.name.toLowerCase().includes(searchValue));
  }

  
}
