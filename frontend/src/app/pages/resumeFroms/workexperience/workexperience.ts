import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

import { InputField } from '../../../components/input-field/input-field';
import { Textarea } from '../../../components/textarea/textarea';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-workexperience',
  imports: [
    InputField,
    Textarea,
    ButtonModule,
    DatePickerModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workexperience.html',
  styleUrl: './workexperience.css',
})
export class Workexperience {
  @Input() experiences!: FormArray;
  @Input() errMessage: string = '';
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getStartDate(index: number) {
    const group = this.experiences.at(index) as FormGroup;
    return group?.get('startDate')?.value;
  }
  getEndDate(index: number) {
    const group = this.experiences.at(index) as FormGroup;
    return group?.get('endDate')?.value;
  }

  getFormGroup(index: number): FormGroup {
    return this.experiences.at(index) as FormGroup;
  }
}
