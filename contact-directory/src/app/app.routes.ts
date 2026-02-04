import { Routes } from '@angular/router';
import { AddContact } from './add-contact/add-contact';
import { SearchContact } from './search-contact/search-contact';

export const routes: Routes = [
    {path: "add-contact", component: AddContact},
    {path: "search-contact", component: SearchContact},
];
