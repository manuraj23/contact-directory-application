import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecieveCountryCode } from '../interfaces/RecieveCounCode';

@Injectable({
  providedIn: 'root',
})
export class CountryCodeService {

  constructor(private http:HttpClient){}
  
  countryCodeUrl = "https://gist.githubusercontent.com/Goles/3196253/raw/CountryCodes.json";
  
  getAllCouncode():Observable<RecieveCountryCode[]> {
    return this.http.get<RecieveCountryCode[]>(this.countryCodeUrl);
  }

}
