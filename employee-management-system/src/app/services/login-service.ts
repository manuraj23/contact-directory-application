import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserData} from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private httpClient : HttpClient){}
  
  loggedIn = signal(false);
  logInTypeUser = signal(true);
  currUser: UserData = {
    id:'',
    name:'',
    password:'',
    projects: [],
    attendance: -1,
    leavesLeft: -1,
    wfhLeft: -1,
    roles: []
  };

  dataUrl: string = '/db.json'

  fetchAllUsers() : Observable<UserData[]>{
    return this.httpClient.get<UserData[]>(this.dataUrl);
  }



}
