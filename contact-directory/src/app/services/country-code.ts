import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryCode {
  constructor(private http:HttpClient){}

  getCountryCode(){
    const url="https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json";
    return this.http.get(url);
  }
}
