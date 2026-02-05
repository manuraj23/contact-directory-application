import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class View {
  constructor(private http: HttpClient) { }

  getCountryCodes() {
  return this.http.get<any[]>(
    'https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json'
  );
}

  viewContact(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/contacts');
  }

  addContact(data: any){
    return this.http.post<any[]>('http://localhost:3000/contacts',data);
  }
}
