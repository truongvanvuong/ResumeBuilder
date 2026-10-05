import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-editor',
  imports: [EditorModule, ReactiveFormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor {
  @Input() formGroup!: FormGroup;
}
