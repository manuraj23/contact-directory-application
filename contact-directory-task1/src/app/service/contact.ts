import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Contact {
 constructor(private http: HttpClient) {}

  getCountryCodes() {
    return this.http.get<any[]>(
      'https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json'
    );
  }
}
