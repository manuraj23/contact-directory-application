import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class View {
  constructor(private http: HttpClient) { }

  viewContact(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/contacts');
  }

  addContact(data: any){
    return this.http.post<any[]>('http://localhost:3000/contacts',data);
  }
}
