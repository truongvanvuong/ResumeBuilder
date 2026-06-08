import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputField } from '../../../components/input-field/input-field';
import { Button } from 'primeng/button';
import { Textarea } from '../../../components/textarea/textarea';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [InputField, Button, Textarea, ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  @Input() projects!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  getFormGroup(index: number): FormGroup {
    return this.projects.at(index) as FormGroup;
  }
}
