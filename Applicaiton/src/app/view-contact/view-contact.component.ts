import { Component } from '@angular/core';
import { ViewService as View } from '../service/view.service';
@Component({
  selector: 'app-view-contact',
  imports: [],
  templateUrl: './view-contact.component.html',
  styleUrl: './view-contact.component.css'
})
export class ViewContactComponent {
  contactData: any;
  constructor(private view: View) { }
  ngOnInit() {
    this.view.viewContact().subscribe((data:any) => {
      this.contactData = data;
      console.log('Contact data:', data);
    });
  }
}
