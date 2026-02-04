import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddService {
  private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  addUser(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
}
