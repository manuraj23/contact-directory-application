import { Routes } from '@angular/router';
import { AddContactComponent } from './contacts/add-contact/add-contact'; 
import { ContactListComponent } from './contacts/contact-list/contact-list'; 

export const routes: Routes = [
  {
    path: '',
    component: ContactListComponent   // default screen
  },
  {
    path: 'add',
    component: AddContactComponent
  }
];
