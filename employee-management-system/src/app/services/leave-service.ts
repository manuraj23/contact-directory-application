import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpApplications } from '../interfaces/emp-applications';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private httpClient : HttpClient){}

  dataUrl: string = '/leave-application.json'

  fetchAllApplications() : Observable<EmpApplications[]>{
    return this.httpClient.get<EmpApplications[]>(this.dataUrl);
  }

  findApplication(id:string) : Observable<EmpApplications>{
    return this.httpClient.get<EmpApplications>(this.dataUrl+'/'+id);
  }

  createNewApplication(application : EmpApplications): Observable<EmpApplications> {
    return this.httpClient.post<EmpApplications>(this.dataUrl, application)
  }
  
  updateApplication(id:string, status:string): Observable<EmpApplications>{
    let application!:EmpApplications;
    this.findApplication(id).subscribe((data)=>{
      application = data;
    })
    application.status = status;
    return this.httpClient.put<EmpApplications>(this.dataUrl, application)
  }

  deleteApplication(id:string) : Observable<EmpApplications>{
    return this.httpClient.delete<EmpApplications>(this.dataUrl+'/'+id);
  }
}
