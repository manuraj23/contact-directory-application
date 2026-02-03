import { Routes } from '@angular/router';
import { ViewContact } from './view-contact/view-contact';
import { AddContact } from './add-contact/add-contact';

export const routes: Routes = [
    { path: 'addContact', component: AddContact },
    {path: 'viewContact', component: ViewContact},
    {path: '', redirectTo: 'addContact', pathMatch: 'full'},
];
