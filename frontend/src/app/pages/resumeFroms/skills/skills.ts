import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputField } from '../../../components/input-field/input-field';
import { Button } from 'primeng/button';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  imports: [InputField, Button, ReactiveFormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  @Input() skills!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getFormGroup(index: number): FormGroup {
    return this.skills.at(index) as FormGroup;
  }
}
