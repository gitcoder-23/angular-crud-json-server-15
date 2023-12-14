import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeServiceService } from '../services/employee-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

export interface Education {
  id: number;
  eduname: string;
  value?: string;
}
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  // educationOld: string[] = ['Matric', 'Intermediate', 'Diploma', 'BTech'];

  empForm: FormGroup;

  educations: Education[] = [
    {
      id: 1,
      eduname: 'Matric',
      value: 'Matric',
    },
    {
      id: 2,
      eduname: 'Intermediate',
      value: 'Intermediate',
    },
    {
      id: 3,
      eduname: 'Diploma',
      value: 'Diploma',
    },
    {
      id: 4,
      eduname: 'Graduate',
      value: 'Graduate',
    },
    {
      id: 5,
      eduname: 'Post Graduate',
      value: 'Post Graduate',
    },
  ];

  // Service variable added in constructor

  // Operation created services injected in constructor

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeServiceService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,

    // For only Edit
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  getEmployeeList() {
    this._empService.getAllEmployees().subscribe({
      next: (res: any) => {
        console.log('get-resp=>', res);
      },
      error: (err: any) => {
        console.log('get-err=>', err);
      },
    });
  }

  ngOnInit() {
    this.getEmployeeList();
    // Edits
    this.empForm.patchValue(this.data);
  }

  onEmpFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        console.log('formValue=>', this.data);
        this._empService
          .editAnEmployee(this.empForm.value, this.data.id)
          .subscribe({
            next: (val: any) => {
              console.log('updateVal=>', val);
              alert(`Employee update success!`);
              // When update done then -> true refresh the component

              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error('update-err=>', err);
            },
          });
      } else {
        // console.log('formValue=>', this.empForm.value);
        this._empService.addNewEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            console.log('addval=>', val);
            alert(`Employee add success!`);
            // When add done then -> true

            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('add-err=>', err);
          },
        });
      }
    }
  }
}
