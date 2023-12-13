import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
export class EmpAddEditComponent {
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

  constructor(private _fb: FormBuilder) {
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

  onEmpFormSubmit() {
    if (this.empForm.valid) {
      console.log('formValue=>', this.empForm.value);
    }
  }

  // ngOnInit() {
  //   this.empForm = this._fb.group({

  //   });
  // }
}
