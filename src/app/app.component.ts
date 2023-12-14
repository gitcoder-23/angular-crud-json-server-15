import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeServiceService } from './services/employee-service.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface employeeData {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  gender: string;
  education: string;
  company: string;
  experience: string;
  package: string;
  id: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud-json-server-15';

  displayedColumns: string[] = [
    'id',
    'employeeName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
  ];
  dataSource!: MatTableDataSource<employeeData | any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Here dependency injection added
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeServiceService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();

    throw new Error('Method not implemented.');
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }

  getEmployeeList() {
    this._empService.getAllEmployees().subscribe({
      next: (res: any) => {
        console.log('get-resp=>', res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log('get-err=>', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
