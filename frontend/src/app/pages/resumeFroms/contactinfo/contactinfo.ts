import { Component, Input, OnDestroy } from '@angular/core';
import { InputField } from '../../../components/input-field/input-field';
import { MessageModule } from 'primeng/message';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactinfo',
  imports: [InputField, MessageModule, ReactiveFormsModule],
  templateUrl: './contactinfo.html',
  styleUrl: './contactinfo.css',
})
export class Contactinfo implements OnDestroy {
  ngOnDestroy(): void {}
  @Input() contactForm!: FormGroup;
  @Input() errMessage: string = '';
}
