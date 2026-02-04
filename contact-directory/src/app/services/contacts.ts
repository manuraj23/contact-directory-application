import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Contacts {
  constructor(private http:HttpClient){}

  getContacts(){
    const url="http://localhost:3000/contacts";
    return this.http.get(url);
  }
}
