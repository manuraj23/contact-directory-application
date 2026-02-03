import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddContact } from './add-contact/add-contact';
import { ShowContact } from './show-contact/show-contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddContact, ShowContact],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('contactScreen');
}
