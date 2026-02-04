import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryCode {
   private url="https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json";

  constructor(private http:HttpClient){}

  getCountryCode(){
    return this.http.get(this.url);
  }
}
