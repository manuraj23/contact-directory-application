import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient) { }

  viewContact() {
    const url="http://localhost:3000/users"
    return this.http.get(url);
  }
}
