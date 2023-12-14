import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private _http: HttpClient) {}

  // Add Employee

  public addNewEmployee(edata: any): Observable<any> {
    console.log('edata=>', edata);

    return this._http.post('http://localhost:3089/employees', edata);
  }
}
