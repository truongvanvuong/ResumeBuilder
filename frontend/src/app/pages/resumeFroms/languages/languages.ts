import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputField } from '../../../components/input-field/input-field';
import { Button } from 'primeng/button';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-languages',
  imports: [InputField, Button, ReactiveFormsModule],
  templateUrl: './languages.html',
  styleUrl: './languages.css',
})
export class Languages {
  @Input() languages!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getFormGroup(index: number): FormGroup {
    return this.languages.at(index) as FormGroup;
  }
}
