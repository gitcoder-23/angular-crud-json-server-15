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
    // console.log('edata=>', edata);

    return this._http.post('http://localhost:3089/employees', edata);
  }

  // Edit an Employee

  public editAnEmployee(edata: any, edId: number | string): Observable<any> {
    // console.log('edata=>', edata);

    return this._http.put(`http://localhost:3089/employees/${edId}`, edata);
  }

  // Get list all employees

  public getAllEmployees(): Observable<any> {
    return this._http.get('http://localhost:3089/employees');
  }

  // Delete an employee
  public deleteEmployee(delId: number | string): Observable<any> {
    return this._http.delete(`http://localhost:3089/employees/${delId}`);
  }
}
