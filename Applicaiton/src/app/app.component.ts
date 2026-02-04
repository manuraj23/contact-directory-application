import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AddContactComponent,ViewContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Applicaiton';
}
