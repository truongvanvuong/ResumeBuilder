import { Education } from './../../../types/Resumes';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Button } from 'primeng/button';
import { InputField } from '../../../components/input-field/input-field';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-education-details',
  imports: [InputField, Button, ReactiveFormsModule],
  templateUrl: './education-details.html',
  styleUrl: './education-details.css',
})
export class EducationDetails {
  @Input() education!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getFormGroup(index: number): FormGroup {
    return this.education.at(index) as FormGroup;
  }

  getStartDate(index: number) {
    const group = this.education.at(index) as FormGroup;
    return group?.get('startDate')?.value;
  }
  getEndDate(index: number) {
    const group = this.education.at(index) as FormGroup;
    return group?.get('endDate')?.value;
  }
}
