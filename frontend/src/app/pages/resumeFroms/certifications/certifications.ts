import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputField } from '../../../components/input-field/input-field';
import { Button } from 'primeng/button';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-certifications',
  imports: [InputField, Button, ReactiveFormsModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css',
})
export class certifications {
  @Input() certifications!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getFormGroup(index: number): FormGroup {
    return this.certifications.at(index) as FormGroup;
  }
}
