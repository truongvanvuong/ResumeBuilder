import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';

import { isValidEmail } from '../../shared/utils/validators';
import { getFieldErrorMessage } from '../../shared/utils/validators';
@Component({
  selector: 'app-input-field',
  imports: [InputTextModule, PasswordModule, DatePickerModule, MessageModule, FormsModule],
  templateUrl: './input-field.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ],
  styleUrl: './input-field.css',
})
export class InputField implements ControlValueAccessor, Validator {
  @Input() control!: FormControl;
  @Input() view: 'date' | 'month' | 'year' = 'date';
  @Input() maxDate?: Date;
  @Input() minDate?: Date;
  @Input() dateFormat: string = 'mm/dd/yy';
  @Input() messageError: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() submitted: boolean = false;
  @Input() disabled: boolean = false;
  @Input() minlength: number | null = null;

  value: any = '';
  touched: boolean = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
    if (!this.value) {
      this.touched = false;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  handleInput(value: any) {
    this.value = value;
    this.onChange(value);
  }
  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  isInvalid(): boolean {
    if (!this.touched && !this.submitted) return false;
    return this.validate() !== null;
  }
  validate(): ValidationErrors | null {
    if (this.messageError != '') return { messageError: this.messageError };
    if (this.required && !this.value) return { required: true };
    if (this.type === 'email' && this.value && !isValidEmail(this.value)) return { email: true };
    if (this.minlength && this.value && this.value.length < this.minlength) {
      return { minlength: { requiredLength: this.minlength } };
    }

    return null;
  }
  getErrorMessage(): string {
    return getFieldErrorMessage(this.label, this.validate());
  }
}
